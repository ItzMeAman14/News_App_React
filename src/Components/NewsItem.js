import React from 'react'


const NewsItem = (props) => {

        let { title, description, imageURL, newsURL, publishTime, author, source } = props;
        return (
            <div className='my-3'>
                <div className="card" key={imageURL}>
                    <img src={imageURL} className="card-img-top" alt="news" />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-body-secondary">By {!author ? "Unknown" : author} on {new Date(publishTime).toUTCString()}</small></p>
                        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{"zIndex":1,"left":"89%"}}>
                            {source}
                        </span>
                    </div>
                    <div className='card-footer'>
                        <a href={newsURL} target='_blank' rel='noreferrer' className="btn btn-sm btn-primary btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }

export default NewsItem
