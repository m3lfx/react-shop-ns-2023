class APIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }
    // http://localhost:4001/api/v1/products?keyword=apple
    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: 'i'
            }
        } : {}
        // console.log(keyword,this.query);
        this.query = this.query.find({ ...keyword });
        return this;
    }
    // http://localhost:4001/api/v1/products?keyword=apple&price[gte]=1&price[lte]=200
    filter() {
        const queryCopy = { ...this.queryStr };
        console.log(queryCopy);
        // Removing fields from the query
        const removeFields = ['keyword', 'limit', 'page']
        removeFields.forEach(el => delete queryCopy[el]);
        
        // Advance filter for price, ratings etc
        let queryStr = JSON.stringify(queryCopy);
        console.log(queryStr);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)
        this.query = this.query.find(JSON.parse(queryStr));
        console.log(JSON.parse(queryStr));
        return this;
    }
 // http://localhost:4001/api/v1/products?page=3
    pagination(resPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resPerPage * (currentPage - 1);
        this.query = this.query.limit(resPerPage).skip(skip);
        return this;
    }
}

module.exports = APIFeatures