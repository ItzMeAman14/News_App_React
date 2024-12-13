import React,{useState,useEffect} from 'react'
import NewsItem from './NewsItem'
import default_img from "../images/default_image.jpg"
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, settotalResults] = useState(0);
  
  const capitalizefirstLetter = (val) => {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1)
  }

  async function updateNews() {
    props.setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30)
    let parsedData = await data.json();
    props.setProgress(50)
    setArticles(parsedData.articles)
    settotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100)
  }
  
  
  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pagesize=${props.pageSize}`;
    setPage(page+1)
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
    settotalResults(parsedData.totalResults)
    setLoading(false)
  };

  useEffect(() => {
    return () => {
      document.title = `NewsMato - ${capitalizefirstLetter(props.category)} ${props.name}`
      updateNews()
    };
  }, []);
  
    return (

      <>
        <h3 className='text-center text-decoration-underline' style={{"marginTop":"90px"}}>NewsMato - Top {capitalizefirstLetter(props.category)} Headlines</h3>
        {loading && <Spinner/>}
        <InfiniteScroll
          style={{
            "overflow":"hidden"
          }}
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
          <div className='container'>
            <div className='row'>
              {articles.map((element) => {
                return <div className='col-md-4' key={element.url}>
                  <NewsItem title={!element.title ? " " : element.title.slice(0, 45)} description={element.description ? element.description.slice(0, 88) : " "} imageURL={element.urlToImage ? element.urlToImage : default_img} newsURL={element.url} publishTime={element.publishedAt} author={element.author} source={element.source.name} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>


    )
  }


News.defaultProps = {
  country: "us",
  pageSize: 6,
  category: "general"
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}

export default News
