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
    setLoading(true)
    let data = await fetch("http://localhost:6551/news",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        country:props.country,
        category:props.category,
        apiKey:props.apiKey,
        page:page,
        pageSize:props.pageSize
      })
    });
    const parsedData = await data.json();
    
    props.setProgress(30)
    setArticles(parsedData.articles)
    props.setProgress(50)
    settotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100)
  }
  
  
  const fetchMoreData = async () => {
    let data = await fetch("http://localhost:6551/news",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        country:props.country,
        category:props.category,
        apiKey:props.apiKey,
        page:page+1,
        pageSize:props.pageSize
      })
    });
    setPage(page+1)
    const parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
    settotalResults(parsedData.totalResults)
    setLoading(false)
  };

  useEffect(() => {
    return () => {
      document.title = `NewsMato - ${capitalizefirstLetter(props.category)}`
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
