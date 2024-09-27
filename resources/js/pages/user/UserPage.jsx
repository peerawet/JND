import React, { useEffect, useState } from "react";
import {
    Container,
    TextField,
    Button,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";
import Navbar from "../../common/Navbar.jsx";
import axios from "axios";

const UserPage = () => {
    const [url, setUrl] = useState("");
    const [shortUrls, setShortUrls] = useState([]);

    useEffect(() => {
        const fetchShortUrls = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_APP_BACKEND_URL}/get-shorten-by-id`
                );
                console.log(response);
                setShortUrls(response.data.urls);
            } catch (error) {
                console.error("Error fetching URLs:", error);
            }
        };
        fetchShortUrls();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_APP_BACKEND_URL}/shortener`,
                {
                    fullUrl: url,
                }
            );

            setShortUrls([...shortUrls, response.data]);
            setUrl("");
        } catch (error) {
            console.error("Error shortening URL:", error);
        }
    };

    return (
        <>
            <Navbar />
            <Container >
                <Typography variant="h4" align="center" gutterBottom>
                    URL Shortener
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        required
                        placeholder="Url"
                        type="url"
                        name="fullUrl"
                        id="fullUrl"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                    <Button type="submit">Shortener</Button>
                </form>

                <TableContainer component={Paper}>
                    <Table >
                        <TableHead>
                            <TableRow>
                                <TableCell>Full URL</TableCell>
                                <TableCell>Short URL</TableCell>
                                <TableCell>Clicks</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {shortUrls.map((shortUrl) => (
                                <TableRow key={shortUrl.id}>
                                    <TableCell>
                                        <a href={shortUrl.full}>
                                            {shortUrl.full}
                                        </a>
                                    </TableCell>
                                    <TableCell>
                                        <a href={shortUrl.short}>
                                            {shortUrl.short}
                                        </a>
                                    </TableCell>
                                    <TableCell>{shortUrl.clicks}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </>
    );
};

export default UserPage;
