async function updateUserDetails(userId, email, username, accessToken) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/users/${userId}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                email: email,
                username: username,
            }),
        }
    );

    const data = await response.json();
    return data;
}

export default updateUserDetails;
