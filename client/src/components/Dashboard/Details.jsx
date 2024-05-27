import React, { useContext, useEffect } from 'react'
import { Box, Card, CardBody, CardHeader, Grid, Heading, Tag, Text, useBreakpointValue } from '@chakra-ui/react'
import UserContext from '../../context/UserContext'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

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

    const totalMotor = details?.motorActivities.map(motor => {
        const distance = (motor.speed / 3.6) * motor.time; // Convert speed to m/s and multiply by time in seconds  
        return {
            timestamp: new Date(motor.timestamp).toLocaleString(),
            speed: motor.speed,
            time: motor.time,
            distance
        };
    }) || [];

    const totalTimeTravelled = totalMotor.reduce((sum, motor) => sum + motor.time, 0);
    const totalSpeed = totalMotor.reduce((sum, motor) => sum + motor.speed, 0);
    const averageSpeed = totalSpeed / totalMotor.length;
    const distanceTravelled = totalMotor.reduce((sum, motor) => sum + ((motor.speed / 3.6) * motor.time), 0)

    const gridTemplateColumns = useBreakpointValue({ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' });
    const chartHeight = useBreakpointValue({ base: 250, md: 300, lg: 400 });


    console.log("Details", details)
    return (
        <>
            <Box padding="25px">
                <Grid templateColumns={gridTemplateColumns} gap="25px">
                    <Card key="eyeClosures" variant="elevated">
                        <CardHeader>
                            <Heading size="2xl">{details?.eyeClosures.length} </Heading>
                            <Text>Eyes Closed</Text>
                        </CardHeader>
                    </Card>
                    <Card key="yawns" variant="elevated">
                        <CardHeader>
                            <Heading size="2xl">{details?.yawns.length} </Heading>
                            <Text>Total Yawn</Text>
                        </CardHeader>
                    </Card>
                    <Card key="distanceTravelled" variant="elevated">
                        <CardHeader>
                            <Heading size="2xl">{`${distanceTravelled.toFixed(2)} m`} </Heading>
                            <Text>Distance Travelled</Text>
                        </CardHeader>
                    </Card>
                    <Box gridArea={{ base: "auto", lg: "2/1/4/3" }} backgroundColor="#fff" padding="25px" boxShadow="0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);" borderRadius="0.375rem">
                        <Heading variant="h6" gutterBottom>
                            Eye Disclosure Over Time
                        </Heading>
                        <ResponsiveContainer width="100%" height={chartHeight}>
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
                                    formatter={(value) => [`${value.toFixed(2)} seconds`, 'Duration']}
                                />
                                <Legend verticalAlign="top" height={36} />
                                <Line type="monotone" dataKey="duration" stroke="var(--body-color)" activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </Box>
                    <Card key="averageEyeClosureDuration" variant="elevated" gridArea={{ base: "auto", lg: "2/3/3/4" }}>
                        <CardHeader>
                            <Heading size="2xl">{averageEyeClosureDuration} </Heading>
                            <Text>Average Eye Closure Duration</Text>
                        </CardHeader>
                    </Card>

                    <Box
                        gridArea={{ base: "auto", lg: "4/1/6/3" }}
                        backgroundColor="#fff"
                        padding="25px"
                        boxShadow="0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)"
                        borderRadius="0.375rem"
                    >
                        <Heading variant="h6" gutterBottom>
                            Yawn Duration Over Time
                        </Heading>
                        <ResponsiveContainer width="100%" height={chartHeight}>
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
                                    formatter={(value) => [`${value.toFixed(2)} seconds`, 'Duration']}
                                />
                                <Legend verticalAlign="top" height={36} />
                                <Line type="monotone" dataKey="duration" stroke="var(--body-color)" activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </Box>
                    <Card key="averageYawnDuration" variant="elevated" gridArea={{ base: "auto", lg: "4/3/5/4" }}>
                        <CardHeader>
                            <Heading size="2xl">{averageYawnDuration} sec </Heading>
                            <Text>Average Yawn Duration</Text>
                        </CardHeader>
                    </Card>
                    <Box
                        gridArea={{ base: "auto", lg: "7/1/9/3" }}
                        backgroundColor="#fff"
                        padding="25px"
                        boxShadow="0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)"
                        borderRadius="0.375rem"
                    >
                        <Heading variant="h6" gutterBottom>
                            Vehicle Stats
                        </Heading>
                        <ResponsiveContainer width="100%" height={chartHeight}>
                            <BarChart data={totalMotor} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="time"
                                    tickFormatter={(tick) => new Date(tick).toLocaleString()}
                                    label={{ value: 'Time', position: 'insideBottomRight', offset: -5 }}
                                />
                                <YAxis
                                    label={{ value: 'Speed (km/hr)', angle: -90, position: 'insideLeft' }}
                                />
                                <Tooltip
                                    labelFormatter={(label) => `Time: ${new Date(label).toLocaleString()}`}
                                    formatter={(value, name, props) => {
                                        const { payload } = props;
                                        return [
                                            `${value.toFixed(2)} ${name === 'distance' ? 'm' : name === 'speed' ? 'km/hr' : 'seconds'}`,
                                            name
                                        ];
                                    }}
                                    content={({ payload }) => {
                                        if (!payload || !payload.length) return null;
                                        const { timestamp, speed, time, distance } = payload[0].payload;
                                        return (
                                            <Box padding="10px" backgroundColor="white" boxShadow="0 0 5px rgba(0, 0, 0, 0.3)">
                                                <Text><strong>Time:</strong> {timestamp}</Text>
                                                <Text><strong>Speed:</strong> {speed.toFixed(2)} km/hr</Text>
                                                <Text><strong>Time:</strong> {time.toFixed(2)} seconds</Text>
                                                <Text><strong>Distance:</strong> {distance.toFixed(2)} m</Text>
                                            </Box>
                                        );
                                    }}
                                />
                                <Legend verticalAlign="top" height={36} />
                                <Bar dataKey="speed" fill="var(--body-color)" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Box>
                    <Card key="totalTimeTravelled" variant="elevated" gridArea={{ base: "auto", lg: "7/3/8/4" }}>
                        <CardHeader>
                            <Heading size="2xl">{`${totalTimeTravelled.toFixed(2)} sec`} </Heading>
                            <Text>Total Time Travelled</Text>
                        </CardHeader>
                    </Card>
                    <Card key="averageSpeed" variant="elevated" gridArea={{ base: "auto", lg: "8/3/9/4" }}>
                        <CardHeader>
                            <Heading size="2xl">{`${averageSpeed.toFixed(2)} km/hr`} </Heading>
                            <Text>Average Speed</Text>
                        </CardHeader>
                    </Card>
                    <Box
                        gridArea={{ base: "auto", lg: "9/1/11/3" }}
                        backgroundColor="#fff"
                        padding="25px"
                        boxShadow="0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)"
                        borderRadius="0.375rem"
                    >
                        <Heading variant="h6" gutterBottom>
                            Distance Stats
                        </Heading>
                        <ResponsiveContainer width="100%" height={chartHeight}>
                            <BarChart data={totalMotor} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="time"
                                    tickFormatter={(tick) => new Date(tick).toLocaleString()}
                                    label={{ value: 'Time', position: 'insideBottomRight', offset: -5 }}
                                />
                                <YAxis
                                    label={{ value: 'Distance (m)', angle: -90, position: 'insideLeft' }}
                                />
                                <Tooltip
                                    labelFormatter={(label) => `Time: ${new Date(label).toLocaleString()}`}
                                    formatter={(value, name, props) => {
                                        const { payload } = props;
                                        return [
                                            `${value.toFixed(2)} ${name === 'distance' ? 'm' : name === 'speed' ? 'km/hr' : 'seconds'}`,
                                            name
                                        ];
                                    }}
                                    content={({ payload }) => {
                                        if (!payload || !payload.length) return null;
                                        const { timestamp, speed, time, distance } = payload[0].payload;
                                        return (
                                            <Box padding="10px" backgroundColor="white" boxShadow="0 0 5px rgba(0, 0, 0, 0.3)">
                                                <Text><strong>Time:</strong> {timestamp}</Text>
                                                <Text><strong>Speed:</strong> {speed.toFixed(2)} km/hr</Text>
                                                <Text><strong>Time:</strong> {time.toFixed(2)} seconds</Text>
                                                <Text><strong>Distance:</strong> {distance.toFixed(2)} m</Text>
                                            </Box>
                                        );
                                    }}
                                />
                                <Legend verticalAlign="top" height={36} />
                                <Bar dataKey="distance" fill="var(--body-color)" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Box>
                </Grid>
            </Box>
        </>
    )
}

export default Details