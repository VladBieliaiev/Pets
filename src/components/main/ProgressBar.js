import * as React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {useEffect, useState} from "react";
import { createTheme } from '@mui/material/styles';
import {indigo, cyan, lightGreen, amber} from "@mui/material/colors";
import {ThemeProvider} from "@emotion/react";


export const theme = createTheme({
    palette: {
        primary: {
            // main: '#f56e62',
            main: '#fa857a',
        },
    },
});


export const ProgressBar = ({props}) => {
    const [progress, setProgress] = useState(0);


    useEffect(()=>{
        setProgress(props);
    },[props])



    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ width: '10rem' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection:"column" }}>
                    <Box sx={{ width: '100%', mr: 1 }}>
                        <LinearProgress variant="determinate" value={progress}
                                        color="primary"
                                        style={{width:'15rem',height:"1.5rem", borderRadius:"24px", background:"#b3cf9b"}}/>
                    </Box>
                    <Box sx={{ minWidth: 50 }}>
                        <Typography variant="body2" color="text.secondary">{`${Math.round(
                            progress
                        )}%`}</Typography>
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
