export default function Item(props) {
    // console.log(props)

    const { product } = props;
    console.log(product)

       return (
        <article className="product">
            <img src={product.image} alt={product.name} /> 
            <p className="name-product">{product.name}</p>
            <p className="description-product">{product.description}</p>
        </article>
    );
}
