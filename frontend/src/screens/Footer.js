import React from "react";
import { SocialIcon } from "react-social-icons";

// import FacebookIcon from "@mui/icons-material/Facebook";

export default function Footer() {
  return (
    <div className="footer">
      <div className="containerFooter bottom_border ">
        <div className="rowFooter">
          <div className=" col-footer">
            <h5 className=" col_white_amrc pt2">NOUS CONTACTER</h5>
            <p>
              <i className="fa fa-location-arrow"></i> 11 rue Ferdaws.EZZAHRA Tunis {" "}
            </p>
            <p>
              <i className="fa fa-phone"></i> +216 29 605 400{" "}
            </p>
            <p>
              <i className="fa fa fa-envelope"></i> Rached@group.com{" "}
            </p>
          </div>
          <hr />
          <div className=" col-footer">
            <h5>Brand me En Bref</h5>
            <p className="mb10">Si vous êtes à la recherche d'un cadeau unique pour exprimer votre amour,votre gratitude ou même vos excuses, </p>
            <p className="mb10">  nous avons ce qu'il vous faut!
Vivez l'expérience d'apporter de la joie l'expérience d'apporter de la joieà vos proches</p>
            <p className="mb10"> et regardez leurs yeux briller comme les étoiles que vous leur offrirez.
N’hésitez pas à nous poser toutes vos questions </p>
          
<p className="mb10">concernant nos produits et nos services. N’hésitez pas à nous poser toutes vos questions concernant nos produits et nos services. </p></div>
          <hr />
          <div className=" col-footer" >
            <h5>REJOIGNEZ-NOUS</h5>
            <div className="IconsFlex">
              <div className="IconsContainer">
                <SocialIcon url="https://www.facebook.com/3alla9ni" />
              </div>{" "}
              <div className="IconsContainer">
                <SocialIcon url="https://twitter.com/asmaapat" />
              </div>
              <div className="IconsContainer">
                <SocialIcon url="https://instagram.com/asmaapat" />
              </div>{" "}
              <div className="IconsContainer">
                <SocialIcon url="https://linkedin.com/asmaapat" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
