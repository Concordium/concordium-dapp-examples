import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import BeerStore from './components/BeerStore';
import { Container, AppBar, Toolbar, Typography, Grid, Box } from '@mui/material';


function App() {
  const [isConnected, setConnected] = useState(false);
  document.body.style.backgroundColor = "#016a3a";

  return (
    <div className="App">
      <Grid justifyContent={'center'}>
        <Grid>
          <AppBar style={{ background: '#016a3a' }}>
            <Toolbar>
              <Typography variant="h4" component="div" sx={{ flexGrow: 1, ml: 'auto' }}>
                Beer Store!
              </Typography>
            </Toolbar>
          </AppBar >
        </Grid>
        <Grid justifyContent={'center'}>
          <Container sx={{ mt: 30, ml: 'auto' }}>
            <Typography sx={{ flexGrow: 1, ml: 'auto' }}>
              <div>
                {
                  !isConnected ?
                    <div>
                      <Box sx={{ mt: 10 }}>
                        <BeerStore />

                      </Box>
                    </div>
                    :
                    ""
                }
              </div>
            </Typography>
            {/* <Footer /> */}
          </Container>

        </Grid>
      </Grid>
    </div >
  );
}

export default App;
