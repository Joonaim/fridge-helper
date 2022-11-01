import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import SelectFridge from '../Components/SelectFridge'
import { useUserContext } from '../Components/UserContext';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
import { Box } from '@mui/system';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVeryDissatisfied from '@mui/icons-material/SentimentVeryDissatisfied';

export default function FoodWaste() {

    
    const { user } = useUserContext();
    const url = `/api/users/${user.id}`;

    const [userFridges, setUserFridges] = useState();
    const [currentFridge, setCurrentFridge] = useState();
    const [wasteMessage, setWasteMessage] = useState();
    const [chartDataState, setChartDataState] = useState();
    const [mostOftenList, setMostOftenList] = useState();

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
      );
      
      const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 3,
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: false
          },
        },
      };
      
      // ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
      const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

      const date = new Date();
      const currentMonth = labels[date.getMonth()];
      const backgroundColors = labels.map((label) => label == currentMonth ? '#AF473C' : '#E8B172')
      
      const chartData = {
        labels,
        datasets: [
          {
            label: 'Food Waste',
            data: chartDataState,
            backgroundColor: backgroundColors,
            hoverBackgroundColor: backgroundColors,
          }
        ],
      };

    useEffect(() => {

        async function fetchData() {

            const currentYear = date.getFullYear()

            await axios.get('/api/foodwaste/' + currentYear + '/' + currentFridge, { withCredentials: true })
            .catch((error) => {
                console.log('Error -> ' + error)
                if (error.response.data.error) {
                    console.log('Error body -> ' + error.response.data.error)
                }
                return
            }).then((result) => {
                if (!result || result.status >= 400) {
                    return
                } else if (result.data) {

                    if (result.data.MTOPercent == 0) {
                        setWasteMessage(`This fridge produces as much waste as other fridges!`)
                    } else {
                        if (result.data.moreThanOthers) {
                            setWasteMessage(`This fridge produces ${result.data.MTOPercent}% more food waste than other fridges 😞`)
                        } else {
                            setWasteMessage(`This fridge produce ${result.data.MTOPercent}% less food waste than other fridges! Very good! 🥳`)
                        }
                    }

                    let tempData = [0,0,0,0,0,0,0,0,0,0,0,0]

                    result.data.wastePerMonth.forEach(element => {
                        const tempDate = new Date(element.month);
                        tempData[tempDate.getMonth()] = element.total_amount;
                    });

                    setChartDataState(tempData)
                    setMostOftenList(result.data.mostOftenExpiring)

                }
            })

        }

        if (currentFridge) {
            fetchData()
        }

    }, [currentFridge]);

    useEffect(() => {

        async function fetchData() {
            try {
                const res = await axios.get(url, { withCredentials: true });
                setUserFridges(res.data.userFridges);
            } catch (err) {
                console.log(err);
            }
        }

        fetchData();

    }, []);

  return (

    <>
        {userFridges && (
            <Box sx={{margin:1}}>

                <SelectFridge
                    currentFridge={currentFridge}
                    setCurrentFridge={setCurrentFridge}
                    fridges={userFridges}
                />

                <Paper elevation={3} style={{background: '#F9F9F9'}} sx={{marginTop: 5, marginLeft: 0.5, marginRight: 0.5, padding: 1}}>
                    <Box sx={{margin: 1}}>
                        <Typography
                            variant="text"
                            color="inherit"
                            sx={{
                            lineHeight: "36px",
                            fontSize: "18px",
                            fontWeight: 400,
                            letterSpacing: "1.25px",
                            textTransform: "uppercase",
                            }}
                        >
                            Food waste per month this year
                        </Typography>
                    </Box>
                    <Box sx={{margin: 2, height: '25vh'}}>
                        <Bar options={chartOptions} data={chartData}/>
                    </Box>
                </Paper>

                <Box sx={{marginTop: 1, marginRight: 1, marginLeft: 1, marginBottom: 2}}>
                <Typography
                        variant="text"
                        color="inherit"
                        sx={{
                        lineHeight: "22px",
                        fontSize: "16px",
                        fontWeight: 400,
                        fontStyle: 'normal',
                        letterSpacing: "0.5px",
                        }}
                    >
                    {wasteMessage}
                    </Typography>
                </Box>

                <Paper elevation={3} style={{background: '#F9F9F9'}} sx={{marginTop: 5, marginLeft: 0.5, marginRight: 0.5, padding: 1}}>
                    <Box sx={{margin: 1}}>
                        <Typography
                            variant="text"
                            color="inherit"
                            sx={{
                            lineHeight: "36px",
                            fontSize: "18px",
                            fontWeight: 400,
                            letterSpacing: "1.25px",
                            textTransform: "uppercase",
                            }}
                        >
                            Most often expiring items this year
                        </Typography>
                    </Box>
                    <Box sx={{margin: 0}}>
                        <List dense sx={{
                            width: '100%',
                            position: 'relative',
                            overflow: 'auto',
                        }}>

                        {mostOftenList && mostOftenList.length > 0 ? mostOftenList.map(element => (
                            <ListItem key={element.name}>
                                <ListItemAvatar>
                                    {
                                        element.total_amount >= 8 ?
                                            (
                                            <Avatar sx={{bgcolor: '#AF473C'}}>
                                                <SentimentVeryDissatisfied/>
                                            </Avatar>
                                            ) : element.total_amount > 3 ?
                                            (
                                            <Avatar sx={{bgcolor: '#DBA039'}}>
                                                <SentimentDissatisfiedIcon/>
                                            </Avatar>
                                            ) : (
                                            <Avatar sx={{bgcolor: '#39DB6E'}}>
                                                <SentimentSatisfiedAltIcon/>
                                            </Avatar>
                                            )
                                    }
                                </ListItemAvatar>
                                <ListItemText primary={element.name} secondary={`on average ${element.total_amount} per/month`} />
                            </ListItem>

                            )) : <ListItem>
                            <ListItemAvatar>
                                <Avatar sx={{bgcolor: '#39DB6E'}}>
                                    <SentimentSatisfiedAltIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={'You have no expired items!'} secondary={'Great job!'} />
                        </ListItem>
                        }

                        </List>
                    </Box>
                </Paper>
                
            </Box>
        )}
    </>

    
  )
}
