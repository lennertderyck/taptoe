export const storedCredentials = () => {
    const stored = localStorage.getItem('credentials')
    return stored ? JSON.parse(stored) : null
}

export const removeCredentials = () => {
    localStorage.removeItem('credentials')
}