import "./product.css"
import Chart from  "../../components/chart/Chart"
import {productData}  from "../../dummyData"
import {Link} from "react-router-dom"
import { Publish } from "@material-ui/icons"


function Product() {
    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">Product</h1>
                <Link to="/newproduct">
                <button className="productAddButton">
                Crée un produit
                </button>
                </Link>
            </div>
            <div className="productTop">
             <div className="productTopLeft">
                 <Chart data={productData} dataKey="Sales" title="Sales Performance"/>
                 </div>   
            <div className="productTopRight">
           <div className="productInfoTop">
               <img src="https://tunisiatech.tn/5464-home_default/ecouteurs-sans-fil-apple-airpods-pro-blanc-mwp22zm-a-tunisie.jpg" alt="" className="productInfoImg" />
           <span className="productName">Apple</span>
           </div>

                <div className="productInfoBottom">
                    <div className="productInfoItem">
                    <span className="productInfoKey">id:</span>
                    <span className="productInfoValue">123</span>
                    </div>

                    <div className="productInfoItem">
                    <span className="productInfoKey">Sales</span>
                    <span className="productInfoValue">6123</span>
                    </div>

                    <div className="productInfoItem">
                    <span className="productInfoKey">active</span>
                    <span className="productInfoValue">Oui</span>
                    </div>

                    <div className="productInfoItem">
                    <span className="productInfoKey">En stock :</span>
                    <span className="productInfoValue">Non</span>
                    </div>
                </div>
            </div>
            </div>
           <div className="productBottom">          
            <form  className="productForm">
                <div className="productFormLeft">
                   <label>Nom de produit</label> 
                   <input type="text" placeholder="Apple Airpods" />
                   <label >En stock</label>
                   <select name="inStock" id="idStock">
                   <option value="yes">Yes</option>
                         <option value="No">Non</option>

                   </select>
                   <label >Active</label>
                   <select name="active" id="active">
                   <option value="yes">Oui</option>
                         <option value="No">Non</option>

                   </select>
                </div>
                <div className="productFormRight">
                    <div className="productUpload">
                        <img src="https://tunisiatech.tn/5464-home_default/ecouteurs-sans-fil-apple-airpods-pro-blanc-mwp22zm-a-tunisie.jpg" alt="" className="productUploadImg" />
                    <label for="file">
                        <Publish/>
                    </label>
                    <input type="file" id="file" style={{display:"none"}}/>
                    </div>
                    <button className="productButton">Mise à jour</button>
                </div>
            </form>
           </div>

        </div>
    )
}

export default Product
