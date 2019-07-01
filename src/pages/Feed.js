import React, { Component } from 'react';
import api from '../services/api';
import io from 'socket.io-client';

import './Feed.css';

import more from '../assets/more.svg';
import like from '../assets/like.svg';
import comment from '../assets/comment.svg';
import send from '../assets/send.svg';



class Feed extends Component {

    state = {
        feed: [],
    };

    async componentDidMount() {

        this.registerToSocket();

        const response = await api.get('posts'); //recebe as informações do post que vem do node

        this.setState({ feed: response.data }); //substitui o feed vazio, criado inicialmente, e insere os posts enviados pela api

    }

    registerToSocket = () => { //realtime
        const socket = io('http://localhost:3333');

        //existe uma mensagem que vem do backend com o nome post e like
        //o segundo parâmetro é o nome que eu seto a mensagem e passo uma função para ser executada sempre quando eu recebe-la

        socket.on('post', newPost => {
            this.setState({ feed: [newPost, ...this.state.feed] });
        });

        socket.on('like', likedPost => {
            this.setState({
                feed: this.state.feed.map(post => 
                    post._id === likedPost._id ? likedPost : post
                )
            });
        } )
    }

    handleLike = id => {
        api.post(`/posts/${id}/like`);
    }

    render() {
        return (
            <section id="post-list">

                {this.state.feed.map(post => (
                    <article key={post.id}>
                        <header>
                            <div className="user-info">
                                <span className="user">{post.author}</span>
                                <span className="place">{post.place}</span>
                            </div>
                            <img src={more} alt="Mais" />
                        </header>
                        <img src={`http://localhost:3333/files/${post.image}`} alt=""/>
                        
                        <footer>
                            <div className="actions">
                                <button type="button" onClick={() => this.handleLike(post._id)}> 
                                    <img src={like} alt="" />
                                </button>
                                
                                <img src={comment} alt="" />
                                <img src={send} alt="" />
                            </div>
                            <p>
                                Curtido por <strong> {post.likes} pessoas</strong>
                            </p>

                            <p>
                                <span className="user">{post.author} </span>
                                {post.description}
                    <span className="hashtags">
                                    {post.hashtags}
                    </span>
                            </p>
                        </footer>
                    </article>
                ))}

            </section>
        );
    }
}

export default Feed;