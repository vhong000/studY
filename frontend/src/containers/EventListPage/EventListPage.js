import React, { Component } from 'react';
import { Header, EventList } from '../../components';
import {

    Typography, withStyles,
    Button, Toolbar, Divider
} from '@material-ui/core';

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
};
class EventListPage extends Component {


    render() {
        const { classes } = this.props;
        const listEvents = [
            {
                "date": "November 10",
                "events": [

                    {

                        "title": "Dynamic Programming",
                        "time": "8:00pm",
                        "Description": "He an thing rapid these after going drawn or. Timed she his law the spoil round defer. In surprise concerns informed betrayed he learning is ye. Ignorant formerly so ye blessing. He as spoke avoid given downs money on we. Of properly carriage shutters ye as wandered up repeated moreover. Inquietude attachment if ye an solicitude to. Remaining so continued concealed as knowledge happiness.",
                        "location": "City College",
                        "spots": 5
                    },
                    {

                        "title": "Hash maps",
                        "time": "8:00pm",
                        "Description": "Lose away off why half led have near bedLose away off why half led have near bed,Lose away off why half led have near bed. At engage simple father of period others except. My giving do summer of though narrow marked ",
                        "location": "City College",
                        "spots": 5
                    },

                    {

                        "title": "Amortization",
                        "time": "8:00pm",
                        "Description": "Lose away off why half led have near bed Sentiments two occasional affronting solicitude travelling and one contrasted. Fortune day out married parties. Happiness remainder joy but earnestly for of",
                        "location": "City College",
                        "spots": 5
                    }
                ]
            },

            {
                "date": "November 20",
                "events": [

                    {

                        "title": "recursion",
                        "time": "8:00pm",
                        "Description": "Offered say Lose away off why half led have near bed visited elderly and. Waited period are played family man formed. He ye body or made on pain part meet. You one delay nor begin our folly abod",
                        "location": "City College",
                        "spots": 5

                    },

                    {

                        "title": "sorting",
                        "time": "8:00pm",
                        "Description": "Feel sold off Lose away off why half led have near bedLose away off why half led have near bed Lose away off why half led have near bed felt nay rose met you. We so entreaties cultivated astonished is. Was sister for few longer mrs sudden talent become. Done may bore quit evil old mile",
                        "location": "City College",
                        "spots": 5
                    }
                ]
            },
        ]
        console.log("[Container]: ", this.props);

        return (
            <div>

                <Toolbar variant="dense">
                    <Typography className={classes.grow} color="inherit">
                        Here you can either join or create a study group event
                    </Typography>
                    <Button color="inherit">create event</Button>
                </Toolbar>
                <Divider />
                <EventList listofevents={listEvents} />
            </div>
        )
    }

}

export default withStyles(styles)(EventListPage);


