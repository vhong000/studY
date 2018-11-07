const styles = theme => ({
    main_grid: {
        "padding-top": 30,
        // "background-color": "rgba(121, 134, 204, 0.2)",
    },
    item_grid: {
        "margin-top": 10,
        
    },
    date_group: {
        "top-padding": 30,
    },
    typo_margin: {
    },
    media: {
        height: 90,
    },
    column: {
        flexBasis: '33.33%',
        //"background-color": "rgba(255, 182, 77, 0.7)",
    },
    helper: {
        border: 'none',
        borderRadius: "5px",
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    root: {
        flexGrow: 1,
    },
    grow: {
        fontFamily: "Raleway",
        fontWeight: 'bold',
        fontSize: "20px",
        marginLeft: "15%",
        flexGrow: 1,
        padding: "20px 0",
        
    },
    icon: {
        fontSize: 28,
        color: "rgb(88, 25, 127)",
        verticalAlign: "text-bottom",
        
    },
    date: {
        fontFamily: "Raleway",
        textTransform: "uppercase",
        letterSpacing: "1.5px",
        fontWeight: "800",
        color: "rgb(26, 32, 67)",
    },
    button: {
        backgroundColor: "rgba(121, 134, 204, 0.9)",
        width: "200px",
        fontWeight: "800",
        marginRight: "70px",
        fontFamily: "Raleway",
        '&:hover': {
            backgroundColor: "rgb(121, 134, 204)",
          },
    }
    
});

export default styles;