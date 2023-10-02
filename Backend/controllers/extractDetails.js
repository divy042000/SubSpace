const axios = require('axios');
const _ = require('lodash');

const fetchBlogs = _.memoize(async () => {
    try {
      const response = await axios.get('https://intent-kit-16.hasura.app/api/rest/blogs', {
        headers: {
          'x-hasura-admin-secret': '32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6'
        }
      });
      return response.data.blogs;
    } catch (error) {
      console.error(error);
      throw error;
    }
  });
  

exports.extractDetails = async (req, res, next) => {
  try {
    const blogs = await fetchBlogs();
    const blogCount = blogs.length;
    const longestTitle = _.maxBy(blogs, blog => blog.title.length);
    const privacyBlogs = _.filter(blogs, blog => _.includes(blog.title.toLowerCase(), 'privacy'));
    const uniqueTitles = _.uniqBy(blogs, 'title');
    const responseData = {
      totalBlogs: blogCount,
      longestTitle: longestTitle.title,
      privacyBlogs: privacyBlogs.length,
      uniqueTitles: uniqueTitles.map(blog => blog.title)
    };

    res.json(responseData);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Match Not Found!" });
  }
};

exports.searchDetails = async (req, res, next) => {
  try {
    const blogs = await fetchBlogs();
    const query = req.query.query;
    console.log(query);
    const filteredBlogs = blogs.filter(blog => _.includes(blog.title.toLowerCase(), query.toLowerCase()));
    console.log("reached");
    res.json(filteredBlogs);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "Match Not Found!" });
  }
};
