const Foo = {template:"<div>Foo</div>"};
const Bar = {template:"<div>Bar</div>"};

const routes = [
    {path:"/foo",component:Foo},
    {path:"/bar",component:Bar}
];

module.exports = routes;