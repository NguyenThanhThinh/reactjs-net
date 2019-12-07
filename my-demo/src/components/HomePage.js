import React, { Component } from 'react'
import data from '../Data'

/**
* @author Thinh Nguyen
* @class HomePage
**/

class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            books: []
        }
    }
    componentDidMount() {

        data.getBooks().then(books => {

            books = books.sort((a, b) => new Date(b.date) - new Date(a.date))

            let authorsPromises = []

            for (let book of books) {
                authorsPromises.push(data.getAuthorByBook(book.id))
            }

            Promise.all(authorsPromises).then(authors => {
                for (let author of authors) {
                    for (let book of books) {
                        if (author.books.indexOf(book.id) > -1) {
                            book.authorName = author.name
                        }
                    }
                }

                this.setState({
                    books: books
                })
            })
        })
    }

    render() {
        let bookNodes = this.state.books.map(b => {
            return (
                <div className="card col-md-3" style={{ width: '300px' }} key={b.id}>
                    <img className="card-img-top" src={b.image} alt="Card image" style={{ width: '100%' }} />
                    <div className="card-body">
                        <h4 className="card-title">{b.title}</h4>
                        <p className="card-text">Author: <strong>{b.authorName}</strong></p>
                    </div>
                </div >

            )
        })

        return (
            <div className='row'>
                {bookNodes}
            </div>
        )
    }

}

export default HomePage