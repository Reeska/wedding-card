// drwxr-xr-x 9 reeska reeska              4096 mars  24  2018 Meowth
// drwxr-xr-x 3 reeska reeska              4096 mars  24  2018 projects
// drwxr-xr-x 2 reeska www-data            4096 oct.  19  2016 public_html
// drwxrwxr-x 4 reeska debian-transmission 4096 oct.   7  2016 torrents

const files = [
  {
    permissions: 'drwxr-xr-x',
    links: '9',
    owner: 'reeska',
    group: 'www-data',
    size: '4096',
    date: 'mars  24  2018',
    name: 'Meowth',
  },
  {
    permissions: 'drwxr-xr-x',
    links: '9',
    owner: 'reeska',
    group: 'debian-transmission',
    size: '4096',
    date: 'mars  24  2018',
    name: 'public_html',
  },
];

function ls(files) {
  const sizes = files.reduce((prev, cur) => {
    const p = prev || {};
    Object.keys(cur).forEach(key => {
      const prevValue = p[key] || 0;
      const curValue = cur[key].length;
      p[key] = prevValue > curValue ? prevValue : curValue;
    });

    return p;
  }, {});

  return files.map(file => {
    return Object.keys(file)
      .map(key => file[key].padEnd(sizes[key], ' '))
      .join(' ');
  });
}
