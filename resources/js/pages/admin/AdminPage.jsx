import React, { useEffect, useState } from "react";
import Navbar from "../../common/Navbar.jsx";
import {
    Container,
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";
import axios from "axios";

const AdminPage = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");
    const [userUrls, setUserUrls] = useState([]);

    // Fetch all users on component mount
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_APP_BACKEND_URL}/get-all-users`
                );
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    // Fetch URLs when a user is selected
    useEffect(() => {
        if (selectedUser) {
            const fetchUserUrls = async () => {
                try {
                    const response = await axios.get(
                        `${
                            import.meta.env.VITE_APP_BACKEND_URL
                        }/get-urls-by-user-id/${selectedUser}`
                    );
                    setUserUrls(response.data);
                } catch (error) {
                    console.error("Error fetching URLs for user:", error);
                }
            };

            fetchUserUrls();
        }
    }, [selectedUser]);

    const handleUserChange = (event) => {
        setSelectedUser(event.target.value);
    };

    return (
        <>
            <Navbar />
            <Container className="container">
                <Typography variant="h4" align="center" gutterBottom>
                    Admin Page - Select User to View URLs
                </Typography>

                <FormControl fullWidth>
                    <InputLabel>Select User</InputLabel>
                    <Select
                        value={selectedUser}
                        onChange={handleUserChange}
                        displayEmpty
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {users.map((user) => (
                            <MenuItem key={user.id} value={user.id}>
                                {user.name} ({user.email})
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {selectedUser && (
                    <TableContainer
                        component={Paper}
                        style={{ marginTop: "20px" }}
                    >
                        <Table className="table table-striped table-responsive">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Full URL</TableCell>
                                    <TableCell>Short URL</TableCell>
                                    <TableCell>Clicks</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {userUrls.map((url) => (
                                    <TableRow key={url.id}>
                                        <TableCell>
                                            <a
                                                href={url.full}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {url.full}
                                            </a>
                                        </TableCell>
                                        <TableCell>
                                      
                                            <a
                                                href={`${
                                                    import.meta.env.VITE_APP_FRONTEND_URL
                                                }/${url.short}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {`${import.meta.env.VITE_APP_FRONTEND_URL}/${
                                                    url.short
                                                }`}
                                            </a>
                                        </TableCell>
                                        <TableCell>{url.clicks}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Container>
        </>
    );
};

export default AdminPage;
