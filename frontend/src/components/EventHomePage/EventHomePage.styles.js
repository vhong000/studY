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
    }
});

export default styles;