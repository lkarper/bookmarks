import React, { Component } from 'react';
import BookmarksContext from '../BookmarksContext';
import config from '../config';

const Required = () => (
    <span className='AddBookmark__required'>*</span>
);  

class UpdateBookmark extends Component {

    static contextType = BookmarksContext;

    state = {
        title: '',
        url: '',
        description: '',
        rating: '',
        error: null
    }

    fetchBookmark = (id) => {
        fetch(`${config.API_ENDPOINT}/${id}`, {
            method: 'GET',
            headers: {
              'content-type': 'application/json',
              'Authorization': `Bearer ${config.API_KEY}`
            }
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.statusText);
                }
                return res.json()
            })
            .then(data => {
                const { title, url, description, rating } = data;
                this.setState({
                    title,
                    url,
                    description,
                    rating
                });
            })
            .catch(error => {
                console.log('error', error);
            });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { title, url, description, rating } = this.state;
        const bookmark = {
            title,
            url,
            description,
            rating,
        }
        fetch(`${config.API_ENDPOINT}/${this.props.match.params.id}`, {
            method: 'PATCH',
            body: JSON.stringify(bookmark),
            headers: {
              'content-type': 'application/json',
              'Authorization': `Bearer ${config.API_KEY}`
            }
        })
            .then(res => {
                if(!res.ok) {
                    return res.json().then(error => {
                        throw error
                    })
                }
            })
            .then(data => {
                this.context.updateBookmarks({...bookmark, id: parseInt(this.props.match.params.id)});
                this.props.history.push('/');
            })
            .catch(error => {
                console.log('error', error);
            });
    }

    componentDidMount() {
        this.fetchBookmark(this.props.match.params.id);
    }

    updateTitle = (title) => {
        this.setState({
            title,
        });
    }

    updateURL = (url) => {
        this.setState({
            url,
        });
    }

    updateDescription = (description) => {
        this.setState({
            description,
        });
    }

    updateRating = (rating) => {
        this.setState({
            rating,
        });
    }

    render() {
        const { error } = this.state;
        return (
            <section className='AddBookmark'>
                <h2>Edit bookmark</h2>
                <form
                className='AddBookmark__form'
                onSubmit={this.handleSubmit}
                >
                <div className='AddBookmark__error' role='alert'>
                    {error && <p>{error.message}</p>}
                </div>
                <div>
                    <label htmlFor='title'>
                    Title
                    {' '}
                    <Required />
                    </label>
                    <input
                    type='text'
                    name='title'
                    id='title'
                    placeholder='Great website!'
                    required
                    value={this.state.title}
                    onChange={(e) => this.updateTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='url'>
                    URL
                    {' '}
                    <Required />
                    </label>
                    <input
                    type='url'
                    name='url'
                    id='url'
                    placeholder='https://www.great-website.com/'
                    required
                    value={this.state.url}
                    onChange={(e) => this.updateURL(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='description'>
                    Description
                    </label>
                    <textarea
                    name='description'
                    id='description'
                    value={this.state.description}
                    onChange={(e) => this.updateDescription(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='rating'>
                    Rating
                    {' '}
                    <Required />
                    </label>
                    <input
                    type='number'
                    name='rating'
                    id='rating'
                    value={this.state.rating}
                    onChange={(e) => this.updateRating(e.target.value)}
                    min='1'
                    max='5'
                    required
                    />
                </div>
                <div className='AddBookmark__buttons'>
                    <button type='button' onClick={this.handleClickCancel}>
                    Cancel
                    </button>
                    {' '}
                    <button type='submit'>
                    Save
                    </button>
                </div>
                </form>
            </section>
        );
    }
}

export default UpdateBookmark;