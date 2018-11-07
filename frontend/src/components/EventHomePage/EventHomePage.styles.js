 const styles = theme => ({
    main_grid: {
        "margin-top": 20,
    },
    item_grid: {
        "margin-top": 5,

    },
    item_grid_left: {
        "margin-left": 15,
    },

    date_group: {
        "top-padding": 30,
    },
    title: {
        "margin-bottom": 15

    },
    typo_margin: {
    },
    column: {
        flexBasis: '33.33%',
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    map: {
        width: '1000px',
        height: '1000px'
    },
    media: {
        height: 150
    },

    grid: {
        margin: theme.spacing.unit * 3,
    },
    button: {
        "background-color": "rgb(94, 106, 192)",
        "padding": 0,
        "width": "42%",
        "margin": "10px 5px 10px 0",
        '&:hover': {
        "background-color": "rgb(64, 76, 165)",
        },
    },
    icon: {
        "color": "white",
        "font-size": "32px",
        "font-weight": "bold",
    },
    divider: {
        "width": "30%",
        "background-color": "red",
        "margin": "10px 0",
    },
    interest: {
        "font-family": "Raleway",
        "font-size": "18px",
    },
    going: {
        "font-family": "Raleway",
        "font-size": "15px",
        "color": "darkgrey",
    },
    iconIm: {
        fontSize: 28,
        color: "#B22222",
        verticalAlign: "text-bottom",
        
    },
    share: {
        "width": "27px",
        "height": "27px",
        verticalAlign: "sub",
    },
    white: {
        backgroundColor: "white",
        padding: "10px 320px 10px 15px",
        borderRadius: "9px",
        '&:hover': {
            "box-shadow": "0px 0px 5px 1px rgba(0,0,0,0.38)",
            },
    }
});

export default styles;