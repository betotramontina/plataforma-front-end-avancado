import React from 'react';
import { Link } from 'react-router-dom';

export default function Item(props) {
    // console.log(props)

    const { product } = props;
    console.log(product)

       return (
        <Link to={`/ong-details/${product.id}`} className="product-card-link">
            <article className="product" title={product.tooltipText}>
                <img src={product.image} alt={product.name} /> 
                <p className="name-product">{product.name}</p>
                <p className="description-product">{product.description}</p>
            </article>
        </Link>
    );
}
