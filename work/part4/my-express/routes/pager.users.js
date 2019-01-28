const { Router } = require('express');
const { User, Todo, Sequelize: { Op, where, fn, col }, sequelize } = require('../models');
const url = require('url');

const router = Router();

function seekOffset(page, size) {
	if (page > 0) {
		return (page - 1) * size;
	}
	return 0;
}

class Query {
  constructor(page, size, bsize) {
    this.page = page;
    this.size = size;
    this.bsize = bsize;
  }
}

class Path {
  constructor(active, link, query, text) {
    this.active = active;
    this.link = link;
    this.query = query;
    this.text = text;
  }
}
	
class Pager {
	
	constructor(page=1, size=10, bsize=5, rows=0, url){
		if (!url) {
			throw Error('url is required');
		}
		
		this.currentPage; // 현재 페이지(사용자가 보고싶은 페이지)
		this.elementsPerPage; // 페이지당 표시하는 로우의 개수
		this.pagesPerBlock; // 하단에 표시하는 페이징 넘버의 개수
		this.totalElements; // 테이블이 갖고 있는 모든 로우의 개수
		
		this.totalPages; // 전체 페이지 수
		this.totalBlocks; // 전체 블럭 수 
		
		this.currentBlock; // 현재 블럭
		this.currentBlockStartPage; // 현재 블럭의 시작 페이지 번호
		this.currentBlockEndPage; // 현재 블럭의 끝 페이지 번호
		
		this.beforePage; // 이전 페이지
		this.nextPage; // 다음 페이지
		
		this.paths = []; // Path's Array for Pagination
		
		this.currentPage = page; 
		if (this.currentPage <= 0) {
			this.currentPage = 1;
		}
		this.elementsPerPage = size;
		if (this.elementsPerPage <= 0) {
			this.elementsPerPage = 1;
		}
		this.pagesPerBlock = bsize;
		if (this.pagesPerBlock <= 0) {
			this.pagesPerBlock = 1;
		}
		this.totalElements = rows;

		this.totalPages = Math.ceil(this.totalElements / this.elementsPerPage);
		this.totalBlocks = Math.ceil(this.totalPages / this.pagesPerBlock);
		
		this.currentBlock = Math.ceil(this.currentPage / this.pagesPerBlock);
		this.currentBlockEndPage = this.currentBlock * this.pagesPerBlock;
		this.currentBlockStartPage = this.currentBlockEndPage - this.pagesPerBlock + 1;
		
		/*
		 * For Simple Paging with 2 Buttons (Before, Next)
		 */
		this.beforePage = this.currentPage - 1;
		if (this.beforePage < 0) {
			this.beforePage = 0;
		}
		this.nextPage = this.currentPage + 1;
		if (this.nextPage > this.totalPages) {
			this.nextPage = 0;
		}
		
		this.proceedPath(url);
	}
	
	proceedPath(url) {
		if (this.totalElements > 0) { // 로우가 있을 때
			if (this.currentBlockStartPage > this.pagesPerBlock) {
				// Home 버튼
				this.addPath(new Path('', url, 
					new Query(1, this.elementsPerPage, this.pagesPerBlock), 'Home'));
				// 이전 블럭
				this.addPath(new Path('', url, 
					new Query(this.currentBlockStartPage-1, this.elementsPerPage, this.pagesPerBlock), '<<'));
			}
			
			// Paging 버튼
			for (let pno = this.currentBlockStartPage; pno <= this.currentBlockEndPage; pno++) {
				if (pno == this.currentPage) {
					this.addPath(new Path('active', url, 
						new Query(pno, this.elementsPerPage, this.pagesPerBlock), pno.toString(10)));
				} else {
					if (pno <= this.totalPages) {
						this.addPath(new Path('', url, 
							new Query(pno, this.elementsPerPage, this.pagesPerBlock), pno.toString(10)));
					}
				}
			}
			
			if (this.currentBlockEndPage < this.totalPages) {
				// 이후 블럭
				this.addPath(new Path('', url, 
					new Query(this.currentBlockEndPage+1, this.elementsPerPage, this.pagesPerBlock), '>>'));
				// Last 버튼
				this.addPath(new Path('', url, 
					new Query(this.totalPages, this.elementsPerPage, this.pagesPerBlock), 'Last'));
			}
		} else { // 로우가 없을 때
			this.addPath(new Path('', url, 
				new Query(1, this.elementsPerPage, this.pagesPerBlock), '1'));
		}
	}
	
	addPath(path) {
		this.paths.push(path);
	}
	
}

// http://localhost:3000/pager/users?page=1&size=3&bsize=2
router.get('/pager/users', function(req, res, next) {
  let page = 1;
  let size = 10;
  let bsize = 5;
  
  if (req.query.page) {
    page = +req.query.page;
  }
  if (req.query.size) {
    size = +req.query.size;
  }
  if (req.query.bsize) {
    bsize = +req.query.bsize;
  }
  
  const limit = size;
  const offset = seekOffset(page, size);
	
	// query() 함수를 이용하여 로우 쿼리를 사용할 수 있다.
	// 주목: { type: sequelize.QueryTypes.SELECT} 옵션을 설정하지 않으면 
	// 메타정보를 위한 쿼리가 추가로 수행된다.
	sequelize.query('SELECT COUNT(*) as count FROM users', { type: sequelize.QueryTypes.SELECT})
	.then((result) => {
		console.log(url.parse(req.url));
		// 주목: pathname 값은 router.get() 함수에 설정한 문자열을 가져온다.
		// {
		//   ...
		//   search: '?page=1&size=3&bsize=2',
		//   query: 'page=1&size=3&bsize=2',
		//   pathname: '/pager/users',
		//   path: '/pager/users?page=1&size=3&bsize=2',
  	// 	 href: '/pager/users?page=1&size=3&bsize=2'
		// }
		
		console.log('result: ', result);
		// 주목: 결과가 배열에 담겨있다.
		// result:  [ { count: 11 } ]
		const rows = result[0].count;
		
		const pager = new Pager(page, size, bsize, rows, url.parse(req.url).pathname);
		console.log(pager);
		// {
		//   paths: [
		//     {
		//       active: "active",
		//       link: "/pager/users",
		//       query: {
		//         page: 1,
		//         size: 3,
		//         bsize: 2
		//       },
		//       text: "1"
		//     },
		//     {
		//       active: "",
		//       link: "/pager/users",
		//       query: {
		//         page: 2,
		//         size: 3,
		//         bsize: 2
		//       },
		//       text: "2"
		//     },
		//     {
		//       active: "",
		//       link: "/pager/users",
		//       query: {
		//         page: 3,
		//         size: 3,
		//         bsize: 2
		//       },
		//       text: ">>"
		//     },
		//     {
		//       active: "",
		//       link: "/pager/users",
		//       query: {
		//         page: 4,
		//         size: 3,
		//         bsize: 2
		//       },
		//       text: "Last"
		//     }
		//   ],
		//   currentPage: 1,
		//   elementsPerPage: 3,
		//   pagesPerBlock: 2,
		//   totalElements: 11,
		//   totalPages: 4,
		//   totalBlocks: 2,
		//   currentBlock: 1,
		//   currentBlockEndPage: 2,
		//   currentBlockStartPage: 1,
		//   beforePage: 0,
		//   nextPage: 2
		// }
		
		return pager;
	}).then((pager) => {
		// 주목: Promise 체이닝을 위해서 return 해야 한다.
		return User.findAll({
	    limit,
	    offset,
	  }).then((users) => {
			// 모두 정상이라면 여기서 작업이 완료된다.
	    res.json({users, pager});
	  });
	}).catch((err) => {
    console.error(err);
    next(err);
  });
});

module.exports = router;
