import React, { useContext, useEffect } from 'react'
import { Box, Card, CardBody, CardHeader, Grid, Heading, Tag, Text } from '@chakra-ui/react'
import UserContext from '../../context/UserContext'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Details = () => {
    const { getDetails, details, setDetails } = useContext(UserContext)

    useEffect(() => {
        const fetchDetails = async () => {
            const response = await getDetails();
        }
        fetchDetails();
    }, [])

    // Prepare data for the chart

    const eyeClosuresData = details?.eyeClosures.map(closure => ({
        timestamp: new Date(closure.timestamp).toLocaleString(),
        duration: closure.duration,
    })) || [];

    const yawnData = details?.yawns.map(closure => ({
        timestamp: new Date(closure.timestamp).toLocaleString(),
        duration: closure.duration,
    })) || [];

    const totalEyeDuration = eyeClosuresData.reduce((sum, closure) => sum + closure.duration, 0);
    const averageEyeClosureDuration = eyeClosuresData.length ? (totalEyeDuration / eyeClosuresData.length).toFixed(2) : 0;

    const totalYawnDuration = yawnData.reduce((sum, closure) => sum + closure.duration, 0);
    const averageYawnDuration = eyeClosuresData.length ? (totalYawnDuration / yawnData.length).toFixed(2) : 0;


    console.log("Details", details)
    return (
        <>
            <Box padding="25px">
                <Grid templateColumns="repeat(3,1fr)" gap="25px">
                    <Card key="filled" variant="elevated">
                        <CardHeader>
                            <Heading size="2xl">{details?.eyeClosures.length} </Heading>
                            <Text>Eyes Closed</Text>
                            <Tag size="lg" variant='subtle' colorScheme='green'>
                                + 96
                            </Tag>
                        </CardHeader>
                    </Card>
                    <Card key="filled" variant="elevated">
                        <CardHeader>
                            <Heading size="2xl">{details?.yawns.length} </Heading>
                            <Text>Total Yawn</Text>
                            <Tag size="lg" variant='subtle' colorScheme='cyan'>
                                Teal
                            </Tag>
                        </CardHeader>
                    </Card>
                    <Card key="filled" variant="elevated">
                        <CardHeader>
                            <Heading size="2xl">9934 </Heading>
                            <Text>Distance Travelled</Text>
                            <Tag size="lg" variant='subtle' colorScheme='cyan'>
                                + 10 km
                            </Tag>
                        </CardHeader>
                    </Card>
                    <Box gridArea="2/1/4/3" backgroundColor="#fff" padding="25px" boxShadow="0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);" borderRadius="0.375rem">
                        <Heading variant="h6" gutterBottom>
                            Eye Disclosure Over Time
                        </Heading>
                        <ResponsiveContainer width="100%" height={400}>
                            <LineChart data={eyeClosuresData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="timestamp"
                                    tickFormatter={(tick) => new Date(tick).toLocaleString()}
                                    label={{ value: 'Time', position: 'insideBottomRight', offset: -5 }}
                                />
                                <YAxis
                                    label={{ value: 'Duration (seconds)', angle: -90, position: 'insideLeft' }}
                                />
                                <Tooltip
                                    labelFormatter={(label) => `Time: ${new Date(label).toLocaleString()}`}
                                    formatter={(value, name) => [`${value.toFixed(2)} seconds`, 'Duration']}
                                />
                                <Legend verticalAlign="top" height={36} />
                                <Line type="monotone" dataKey="duration" stroke="var(--body-color)" activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </Box>
                    <Card key="filled" variant="elevated" gridArea="2/3/3/4">
                        <CardHeader>
                            <Heading size="2xl">{averageEyeClosureDuration} </Heading>
                            <Text>Average Eye Closure Duration</Text>
                            <Tag size="lg" variant='subtle' colorScheme='cyan'>
                                + 10 km
                            </Tag>
                        </CardHeader>
                    </Card>
                    <Card key="filled" variant="elevated" gridRow="3/3/4/4">
                        <CardHeader>
                            <Heading size="2xl">{averageYawnDuration} </Heading>
                            <Text>Average Yawn Duration</Text>
                            <Tag size="lg" variant='subtle' colorScheme='cyan'>
                                + 10 km
                            </Tag>
                        </CardHeader>
                    </Card>
                    <Box
                        gridArea="4/1/6/3"
                        backgroundColor="#fff"
                        padding="25px"
                        boxShadow="0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)"
                        borderRadius="0.375rem"
                    >
                        <Heading variant="h6" gutterBottom>
                            Yawn Duration Over Time
                        </Heading>
                        <ResponsiveContainer width="100%" height={400}>
                            <LineChart data={yawnData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="timestamp"
                                    tickFormatter={(tick) => new Date(tick).toLocaleString()}
                                    label={{ value: 'Time', position: 'insideBottomRight', offset: -5 }}
                                />
                                <YAxis
                                    label={{ value: 'Duration (seconds)', angle: -90, position: 'insideLeft' }}
                                />
                                <Tooltip
                                    labelFormatter={(label) => `Time: ${new Date(label).toLocaleString()}`}
                                    formatter={(value, name) => [`${value.toFixed(2)} seconds`, 'Duration']}
                                />
                                <Legend verticalAlign="top" height={36} />
                                <Line type="monotone" dataKey="duration" stroke="var(--body-color)" activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </Box>
                </Grid >

            </Box >
        </>
    )
}

export default Details