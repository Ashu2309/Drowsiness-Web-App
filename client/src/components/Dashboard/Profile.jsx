import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Flex, Grid, HStack, Heading, Image, Input, Menu, MenuButton, MenuGroup, MenuItem, MenuList, Radio, RadioGroup, Text, VStack, useToast } from '@chakra-ui/react';
import UserContext from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { getUser, updateUser, deleteUser } = useContext(UserContext)

    const [user, setUser] = useState(null);
    const [showThis, setShowThis] = useState(1);

    const [loading, setLoading] = useState(true);

    const [updatedDetails, setUpdatedDetails] = useState({
        name: '',
        age: '',
        gender: '',
        location: '',
        phone: '',
        vehicle: '',
        pic: null
    });

    const toast = useToast()
    const navigate = useNavigate()

    useEffect(() => {
        // Fetch user details from localStorage or an API
        const fetchDetails = async () => {
            const response = await getUser();
            setUser(response.data[0]);
            setLoading(false);
            setUpdatedDetails({
                name: response.data[0]?.name || '',
                age: response.data[0]?.age || '',
                gender: response.data[0]?.gender || '',
                location: response.data[0]?.location || '',
                phone: response.data[0]?.phone || '',
                vehicle: response.data[0]?.vehicle || '',
                pic: response.data[0]?.pic || null
            });
        }

        fetchDetails()
    }, []);

    const handleInputChange = (e) => {
        setUpdatedDetails(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const handleImage = (photo) => {
        setLoading(true)
        if (photo === undefined) {
            toast({
                title: "Please Select an Image",
                status: "warning"
            })
        }
        if (photo.type === "image/jpeg" || photo.type === "image/jpg" || photo.type === "image/png") {
            const data = new FormData()
            data.append("file", photo)
            data.append("upload_preset", "chat-app")
            data.append("cloud_name", "ashutosh-coder")
            fetch("https://api.cloudinary.com/v1_1/ashutosh-coder/image/upload", {
                method: "post",
                body: data
            }).then((res) => res.json()).then(data => {
                setUpdatedDetails({ ...updatedDetails, pic: data.url.toString() });
                //console.log(data.url.toString())
                setLoading(false)
            }).catch(error => {
                //console.log(error)
                setLoading(error)
            })
        } else {
            toast({
                title: "Please Select JPG/JPEG/PNG Image",
                status: "error"
            })
        }
    }


    const handleUpdate = async () => {
        // Implement update functionality here
        await updateUser(updatedDetails);
        const response = await getUser();
        setUser(response.data[0]);
        setShowThis(1);
    };



    const handleDelete = async () => {
        // Implement logout functionality here
        const response = await deleteUser();
        if (response.status === 200) {
            toast(
                {
                    title: "Account Deleted Successfully !",
                    status: "success"
                }
            )
            localStorage.removeItem("userInfo");
            navigate("/")
            setUser(null);
        } else {
            toast(
                {
                    title: "Failed to Delete Account !",
                    status: "error"
                }
            )
        }

    };

    console.log(updatedDetails)

    return (
        <Box padding="10px" backgroundColor="#f6f7f8" height="100%">
            <Grid templateColumns="30% 70%" justify="center" align="start" minHeight="100%" maxWidth="100%">
                <Box p="10px" shadow="lg" display="flex" flexDirection="column" backgroundColor="#fff">
                    <Image src={user?.pic} alt="Profile Picture" borderRadius="full" />
                    <Text align="center">{user?.email}</Text>

                    <VStack align="start">
                        <Button variant="outline" width="100%" colorScheme="blue" onClick={() => setShowThis(1)}>Details</Button>
                        <Button variant="outline" width="100%" colorScheme="blue" onClick={() => setShowThis(2)}>Update Details</Button>
                        <Button variant="outline" width="100%" colorScheme="red" onClick={handleDelete}>Delete Account</Button>
                    </VStack>
                </Box>
                {showThis === 1 && (
                    <VStack align="stretch" spacing={2} ml="10px" p="10px" backgroundColor="#fff">
                        <Text><Text as="span" fontWeight="bold">Name:</Text> {user?.name}</Text>
                        <Text><Text as="span" fontWeight="bold">Age:</Text> {user?.age}</Text>
                        <Text><Text as="span" fontWeight="bold">Gender:</Text> {user?.gender}</Text>
                        <Text><Text as="span" fontWeight="bold">Location:</Text> {user?.location}</Text>
                        <Text><Text as="span" fontWeight="bold">Phone:</Text> {user?.phone}</Text>
                        <Text><Text as="span" fontWeight="bold">Vehicle:</Text> {user?.vehicle}</Text>
                    </VStack>
                )}
                {showThis === 2 && (
                    <VStack align="stretch" spacing={4} ml="10px" p="10px" backgroundColor="#fff">
                        <Input type="text" placeholder="Name" name="name" value={updatedDetails.name} onChange={(e) => handleInputChange(e)} />
                        <Input type="number" placeholder="Age" name="age" value={updatedDetails.age} onChange={(e) => handleInputChange(e)} />
                        <Menu>
                            <MenuButton as={Button} variant="outline" colorScheme="blue">
                                {updatedDetails.gender ? updatedDetails.gender : "Select Gender"}
                            </MenuButton>
                            <MenuList>
                                <MenuItem onClick={() => setUpdatedDetails(prevState => ({ ...prevState, gender: "Male" }))}>Male</MenuItem>
                                <MenuItem onClick={() => setUpdatedDetails(prevState => ({ ...prevState, gender: "Female" }))}>Female</MenuItem>
                                <MenuItem onClick={() => setUpdatedDetails(prevState => ({ ...prevState, gender: "Other" }))}>Other</MenuItem>
                            </MenuList>
                        </Menu>
                        <Input type="text" placeholder="Location" name="location" value={updatedDetails.location} onChange={(e) => handleInputChange(e)} />
                        <Input type="tel" placeholder="Phone" name="phone" value={updatedDetails.phone} onChange={(e) => handleInputChange(e)} />
                        <Menu>
                            <MenuButton as={Button} variant="outline" colorScheme="blue">
                                {updatedDetails.vehicle ? updatedDetails.vehicle : "Select Vehicle"}
                            </MenuButton>
                            <MenuList>
                                <MenuItem onClick={() => setUpdatedDetails(prevState => ({ ...prevState, vehicle: "Car" }))}>Car</MenuItem>
                                <MenuItem onClick={() => setUpdatedDetails(prevState => ({ ...prevState, vehicle: "Bike" }))}>Bike</MenuItem>
                                <MenuItem onClick={() => setUpdatedDetails(prevState => ({ ...prevState, vehicle: "Scooter" }))}>Scooter</MenuItem>
                            </MenuList>
                        </Menu>
                        <Input type="file" accept="image/*" onChange={(e) => { handleImage(e.target.files[0]) }} />
                        <Button variant="solid" colorScheme="blue" isLoading={loading ? true : false} onClick={handleUpdate}>Update</Button>
                    </VStack>
                )}


            </Grid>

        </Box>
    );
};

export default Profile;
