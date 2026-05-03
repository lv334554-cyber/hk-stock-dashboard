const fs = require('fs');
const path = require('path');

const WORKSPACE = '/Users/macworkshop/.openclaw/workspace-hk-stock/dashboard';

// Read existing data
const existingData = JSON.parse(fs.readFileSync(path.join(WORKSPACE, 'market_data.json'), 'utf8'));

// Parse the extracted southbound data (first 15 rows)
const southboundRaw = [
    {date: '2026-04-02', net_flow: 198.28},
    {date: '2026-04-01', net_flow: -126.94},
    {date: '2026-03-31', net_flow: 7.03},
    {date: '2026-03-30', net_flow: -24.67},
    {date: '2026-03-27', net_flow: -28.83},
    {date: '2026-03-26', net_flow: 33.40},
    {date: '2026-03-25', net_flow: 223.23},
    {date: '2026-03-24', net_flow: -273.61},
    {date: '2026-03-23', net_flow: 297.28},
    {date: '2026-03-20', net_flow: -210.05},
    {date: '2026-03-19', net_flow: 261.90},
    {date: '2026-03-18', net_flow: 12.17},
    {date: '2026-03-17', net_flow: -114.81},
    {date: '2026-03-16', net_flow: -12.50},
    {date: '2026-03-13', net_flow: 184.49}
];

// Update the data
existingData.southbound = southboundRaw;
existingData.last_updated = new Date().toISOString().slice(0, 19).replace('T', ' ');

// Save
fs.writeFileSync(path.join(WORKSPACE, 'market_data.json'), JSON.stringify(existingData, null, 2), 'utf8');

console.log('Southbound data updated:');
southboundRaw.forEach(d => console.log(`  ${d.date}: ${d.net_flow}亿元`));
