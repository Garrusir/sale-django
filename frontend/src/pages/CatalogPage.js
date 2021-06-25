import React, {useEffect, useState} from 'react';

export function CatalogPage() {
    const [sales, setSales] = useState([]);

    useEffect( () => {
        // const result = await fetch('api/sales');
        // const result = [{id: 1, title: 'Sale 1'}];
        fetch('api/sales/')
            .then((response) => {
                // console.log('result', response.json());
                if (response.status > 400) {
                    console.log('error', response);
                }
                return response.json();
            })
            .then(({sales}) => {
                console.log('data', sales);
                setSales(sales);
            })
    }, [])


    return (
        <div>
            <h1>Страница со списком скидок</h1>
            <ul>
                {
                    sales.map(item =>
                        (<li key={item.id}>
                            {item.title}
                        </li>))
                }
            </ul>
        </div>
    )
}
