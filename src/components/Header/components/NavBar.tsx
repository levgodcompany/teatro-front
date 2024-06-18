import { Box, Button, Collapse, Link, Typography, Theme, useMediaQuery } from "@mui/material"

interface Props {
    pages: string[],
    handleExpandClick: () => void,
    expanded: boolean
}
export const NavBar: React.FC<Props> = ({ pages, handleExpandClick, expanded }) =>{
    const displayButton = expanded?'none':{xs:'none', md: 'flex', lg: 'none'} as const; 

    const isLg = useMediaQuery((theme: Theme) => theme.breakpoints.only('lg'))

    const variantOptions = isLg?'h6':'subtitle2'

    return (
        <>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
            <Button onClick={handleExpandClick} sx={{display: displayButton }}>Menu</Button>
            <Collapse in={expanded} timeout="auto" unmountOnExit orientation="vertical">
                <Box sx={{display:{xs:'none', md: 'flex', lg: 'none'}, flexDirection:'row', justifyContent:'center', gap:'1.5rem'}}>
                {pages.map((page) => (
                    <Link key={page} href={`${page}`} underline="hover">
                        <Typography color='black' variant="h6" textAlign='center'>{page}</Typography>
                    </Link>
                ))}
                </Box>
            </Collapse>
            <Box sx={{ display: { md:'none', xs: 'flex', lg: 'flex'}, justifyContent: 'center', gap: '1.5rem'}}>
            {pages.map((page) => (
                    <Link key={page} href={`${page}`} underline="hover">
                        <Typography color='black' variant={variantOptions} textAlign='center'>{page}</Typography>
                    </Link>
                ))}
            </Box>
        </Box>
        </>
    )
}