let arr = [
    { Id: 1, term: '1', def: '1', image: 'data:ima' },
    { Id: 2, term: '1', def: '1', image: 'data:im' },
    { Id: 3, term: '1', def: '1', image: 'data:imag' },
];

const updatedArra = arra.map(item => {
    if (item.Id === 2) {
        return { ...item, image: '2nd image' };
    }
    return item;
});

console.log(updatedArra);
