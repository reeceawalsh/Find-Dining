import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./styles/login.module.css";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [incorrectCredentials, setIncorrectCredentials] = useState(true);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div
            className={`container ${styles.Login__Container} blue-background black-text`}
        >
            <div className="header">
                <h1>Find Dining</h1>
                <Link className={styles.skip} href="/home">
                    Skip
                </Link>
            </div>
            <Image
                src="/LogoCropped.png"
                className="app-logo"
                height="170"
                width="250"
                alt="logo"
            />
            <div className={styles.loginForm}>
                <Box
                    component="form"
                    sx={{
                        "& .MuiTextField-root": { m: 1, width: "25ch" },
                    }}
                    autoComplete="off"
                >
                    <TextField
                        id="outlined-basic"
                        className={styles.email}
                        label="Email"
                        variant="outlined"
                        type="email"
                    />

                    <FormControl
                        sx={{ m: 1, width: "25ch" }}
                        variant="outlined"
                    >
                        <InputLabel htmlFor="outlined-adornment-password">
                            Password
                        </InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? "text" : "password"}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                        {incorrectCredentials && (
                            <FormHelperText
                                className={styles.errorMessage}
                                id="component-error-text"
                            >
                                Error! We cannot find these details on the
                                system.
                            </FormHelperText>
                        )}
                    </FormControl>
                    <div className={styles.buttons}>
                        <button className={styles.button} type="submit">
                            <Link href="/home">Login</Link>
                        </button>

                        <button className={styles.button}>
                            <Link href="/register">Sign Up </Link>
                        </button>
                    </div>
                </Box>
            </div>
        </div>
    );
}
