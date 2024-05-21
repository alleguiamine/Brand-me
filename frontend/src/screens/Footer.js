import React from "react";
import { Grid, Typography, IconButton } from "@mui/material";
import { Facebook, YouTube, Instagram, LinkedIn } from "@mui/icons-material";

export default function Footer() {
  return (
    <footer style={{ marginTop: '60px'}} className="bg-dark text-light py-4">
      <div className="container" style={{ marginTop: '60px'}}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={4}>
            <Typography variant="h6">NOUS CONTACTER</Typography>
            <Typography>
              <i className="fa fa-location-arrow me-2"></i> 11 rue Ferdaws.EZZAHRA Tunis
            </Typography>
            <Typography>
              <i className="fi fi-sr-circle-phone me-2"></i> +216 90 280 230
            </Typography>
            <Typography>
              <i className="fa fa fa-envelope me-2"></i> BrandMe@group.com
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Brand me En Bref</Typography>
            <Typography>
              Si vous êtes à la recherche d'un cadeau unique pour exprimer votre amour, votre gratitude ou même vos excuses, nous avons ce qu'il vous faut! Vivez l'expérience d'apporter de la joie à vos proches et regardez leurs yeux briller comme les étoiles que vous leur offrirez.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">REJOIGNEZ-NOUS</Typography>
            <div className="d-flex">
              <IconButton>
                <Facebook className="text-light" />
              </IconButton>
              <IconButton>
                <YouTube className="text-light" />
              </IconButton>
              <IconButton>
                <Instagram className="text-light" />
              </IconButton>
              <IconButton>
                <LinkedIn className="text-light" />
              </IconButton>
            </div>
          </Grid>
        </Grid>
      </div>
    </footer>
  );
}
