import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import AppBanner from "../appBanner/AppBanner";
import './singleCharacterPage.scss';

const SingleCharacterPage = () => {
        const {id} = useParams();
        const [data, setData] = useState(null);
        const {loading, error, getComic, getCharacter, clearError} = useMarvelService();

        useEffect(() => {
            updateData()
        }, [id])

        const updateData = () => {
            clearError();
            getCharacter(id)
                .then(onDataLoaded);
        }

        const onDataLoaded = (data) => {
            setData(data);
        }

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !data) ? <Viev data={data}/> : null;

        return (
            <>
                <Helmet>
                    <meta
                        name="description"
                        content="Character description"
                        />
                    <title>Single Character Page</title>
                </Helmet>
                <AppBanner/>
                {errorMessage}
                {spinner}
                {content}
            </>
        )
}

const Viev = ({data}) => {

    const {name, description, thumbnail} = data;

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={name} className="single-comic__char-img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
            </div>
        </div>
    )
}

export default SingleCharacterPage;