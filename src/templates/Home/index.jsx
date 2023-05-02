import { Component } from 'react';

import './styles.css';

import { Posts } from '../../components/Posts';
import { loadPosts } from '../../utils/load-posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 10,
    searchValue: '',
  };

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const postsAndPhotos = await loadPosts();
    const { page, postsPerPage } = this.state;

    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    });
  }

  loadMorePosts = () => {
    const {
      page,
      postsPerPage,
      posts,
      allPosts
    } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts)
    this.setState({ posts, page: nextPage });
  }

  handleInputChange = e => {
    const { value } = e.currentTarget.value;
    this.setState({ ...this.state, searchValue: value });
  }

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage > allPosts.length;

    const filteredPosts = !!searchValue ?
      allPosts.filter(post => post.title.toLowerCase().includes(searchValue.toLowerCase())) : posts;

    return (
      <section className='container'>
        <div className="search-container">
          {!!searchValue && (<h1>Search: {searchValue}</h1>)}

          <TextInput handleChange={this.handleInputChange} searchValue={searchValue} />
        </div>

        {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts} />
        )}

        {filteredPosts.length === 0 && (
          <p>Nenhum resultado encontrado.</p>
        )}

        <div className='button-container'>
          {!searchValue && (
            <Button
              text={'Load more'}
              onClick={this.loadMorePosts}
              disabled={noMorePosts}
            />
          )}
        </div>
      </section>
    )
  }
}

