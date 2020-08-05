import React, { useEffect, useState, useMemo } from 'react';
import './styles.css';
import api from '../../services/api';
import criptomoeda from '../../assets/criptomoeda.svg';

interface Asset {
  type_is_crypto: number;
  asset_id: string;
  name: string;
  price_usd: number;
  formattedPrice?: string;
}

// interface Rate {
//   asset_id_base: string;
//   rates: {
//     asset_id_quote: string;
//     rate: number;
//   }
// }

const Home: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  // const [rates, setRates] = useState<Rate[]>([]);

  useEffect(() => {
    api.get<Asset[]>('/v1/assets').then((response) => {
      const assetsFormatted = response.data.map((asset) => {
        return {
          ...asset,
          formattedPrice: new Intl.NumberFormat('en-IN',
            { style: 'currency', currency: 'USD' })
            .format(asset.price_usd),
        };
      });
      setAssets(assetsFormatted);
    });
}, []);

  const typeisCrypto = useMemo(() => {
    return assets.filter(asset => {
      return asset.type_is_crypto === 1;
    });
  }, [assets]);

  return (
    <>
      <div className="container">
        <div className="home">
          <img 
            className="mover" 
            src={criptomoeda} 
            height="136" 
            alt="Criptomoeda" 
          />
          <h1 className="title">
            Criptomoedas
          </h1>
        </div>
        <table className="rwd-table">
          <tbody>
            <tr>
                <th>#</th>
                <th>Nome</th>
                <th>Preço (USD)</th>
            </tr>
            {typeisCrypto.slice(0, 10).map((asset, index) => (
            <tr key={asset.asset_id}>
              <td>
                {index + 1}
              </td>
              <td>
                {asset.name}
              </td>
              <td>
                {asset.formattedPrice}
              </td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Home;