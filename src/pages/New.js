import React, { Component } from 'react';
import api from '../services/api';

import './New.css';

class New extends Component {

    state = {
        image: null,
        author: '',
        place: '',
        description: '',
        hashtags: '',
    }

    handleSubmit = async e => { 
        //enviar pro backend as info através do services/api
        //para enviar somente texto, utiliza-se json
        //para enviar texto e imagem, é necessário o multipartformdata
        //cria uma variável data, como FormData e através dela, acrescenta (append) e o state gravado -this.state.onome
        
        e.preventDefault();

        const data = new FormData();
        data.append('image', this.state.image);
        data.append('author', this.state.author);
        data.append('place', this.state.place);
        data.append('description', this.state.description);
        data.append('hashtags', this.state.hashtags);

        //para conectar, é preciso usar o await, transformando a funcação em async
        //api.post -éométodo- passando (rota, parâmetro) -parametroéodataqueacabeidecriar-
        await api.post('posts', data)

        this.props.history.push('/');
        //envia o usuário para uma rota já acessada, pode ser em qualquer página para mudar o caminho
    }

    handleChange = e => { //funcao propria
        this.setState ({ [e.target.name]: e.target.value });

    }

    handleImageChange = e => { //para imagem é diferente, o formato da imagem vem em formato de array
        this.setState({ image: e.target.files[0] })
    }


    render() {
        return (
            <form id="new-post" onSubmit={this.handleSubmit}>
                <label><strong>New Photo</strong></label>
                <input type="file" onChange={this.handleImageChange} />

                <input 
                    type="text"
                    name="author"
                    placeholder="Nome do autor"
                    onChange={this.handleChange}
                    value={this.state.author}

                />
                <input 
                    type="text"
                    name="place"
                    placeholder="Local do post"
                    onChange={this.handleChange}
                    value={this.state.place}

                />
                <input 
                    type="text"
                    name="description"
                    placeholder="Descrição do post"
                    onChange={this.handleChange}
                    value={this.state.description}

                />
                <input 
                    type="text"
                    name="hashtags"
                    placeholder="Hashtags do post"
                    onChange={this.handleChange}
                    value={this.state.hashtags}

                />
                <button type="submit">Enviar</button>

            </form>

        );
    }
}

export default New;