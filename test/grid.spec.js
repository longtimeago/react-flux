import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';

import GridComponent from '../js/components/grid';

function setup(propOverrides) {
    const props = Object.assign({
        records:[
            {firstName: "John", lastName: "Doe", active: false, id: 1},
            {firstName: "Mary", lastName: "Moe", active: false, id: 2},
            {firstName: "Peter", lastName: "Noname", active: true, id: 3}
        ],
        filtered: [],
        loading:false,
        dispatch: function(arg1, arg2){
        }
    }, propOverrides);

    const Grid = mount(<GridComponent {...props} />);

    return {
        component:Grid,
        rows:Grid.find('tbody').children()
    }
}

describe('<TestComponent/>', function () {
    it('should render GridComponent with 3 records by default', function () {
        let {rows} = setup();
        expect(rows).to.have.length(3);
    });

    it('should render GridComponent with 2 records with filter', function () {
        let {rows} = setup({
            filtered: [1]
        });
        expect(rows).to.have.length(2);
    });

    it('Renders loading component if loading equals true', function () {
        let {rows, component} = setup({
            loading:true
        });
        expect(rows).to.have.length(0);
        expect(component.find('div').text()).to.equal("Loading...");
    });

});
