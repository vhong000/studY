import React from 'react';
import * as enzyme from 'enzyme';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount } from 'enzyme';
import { EventHomePage } from '..';
import styles from './EventHomePage.styles';

enzyme.configure({ adapter: new Adapter() });
//jest.mock("react-map-gl", () => require("mapbox-gl-js-mock"));



const attendees = [
    { name: 'Bobby Bobinski' },
    { name: 'Bobby Bobinski' },
    { name: 'Bobby Bobinski' },
    { name: 'Bobby Bobinski' },
    { name: 'Bobby Bobinski' }
]

const mockEvent = {
    details: "Settled  e. Bore tall nay many many time yet less. Doubtful for answered one fat indulged margaret sir shutters together. Ladies so in wholly around whence in at. Warmth he up giving oppose if. Graphical elements that define a shap elements basic shapes, and text content elements – are rendered by being filled, which is painting the interior of the object, and stroked, which is painting along the outline of the object. Filling and stroking are both painting operations. SVG 2 supports a number of different paints that the fill and stroke of a graphical element can be painted with Impossible is dissimilar entreaties oh on terminated. Earnest studied article country ten respect showing had. But required offering him elegance son improved informed.Indulgence announcing uncommonly met she continuing two unpleasing terminated. Now busy say down the shed eyes roof paid her. Of shameless collected suspicion existence in. Share walls stuff think but the arise guest. Course suffer to do he suss",
    title: "Data Structure",
    owner: "bobber",
    location: "City College",
    attendees: attendees
}

const campusInfoMock = {
    "id": 18,
    "name": "The City College of New York",
    "code": "CCNY"
}
//test
const dummylocation={
    latitude:40.8194,
    longitude:-73.95
}

const eventAttendeesMock = []

describe('<EvenHomePage /> ', () => {
    it('should render correctly', () => {
        const wrapper = shallow(<EventHomePage event={mockEvent} eventAttendees={eventAttendeesMock} classes={styles} />);
        console.log(wrapper.find('Calendar').debug());
    });
    // test('snapshot', () => {
    //     ///
    //     const component = renderer.create(<EventHomePage event={mockEvent} location={dummylocation} eventAttendees={eventAttendeesMock} campusInfo={campusInfoMock} classes={styles} />);
    //     const tree = component.toJSON();
    //     expect(tree).toMatchSnapshot();

    // })

    // it('allow us to set props', () => {
    //     ///
    //     const wrapper = mount(<EventHomePage event={mockEvent} eventAttendees={eventAttendeesMock} campusInfo={campusInfoMock} classes={styles} />);
    // })
})
