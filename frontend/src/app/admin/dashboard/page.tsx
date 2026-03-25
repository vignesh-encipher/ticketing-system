"use client"
import { Table, Tag, Button, Card } from 'antd';
import {AiOutlineCheckCircle, AiOutlineClockCircle, 
  AiOutlineFolderOpen, AiOutlineArrowRight, AiOutlineFilter,
  AiOutlineUserAdd, AiOutlineSafetyCertificate
} from 'react-icons/ai';


const data:any = {
  "stats": [
    { "label": "Total Tickets", "value": "1,284", "trend": "+12%", "icon": "ticket" },
    { "label": "Open Tickets", "value": "42", "trend": null, "icon": "folder" },
    { "label": "Closed Today", "value": "156", "trend": null, "icon": "check" },
    { "label": "Avg. Resolution", "value": "4.2h", "trend": null, "icon": "clock" }
  ],
  "activeTickets": [
    { "id": "#TK-8492", "title": "Firewall Port Request", "time": "2 mins ago", "author": "Sarah J.", "source": "HR", "target": "IT", "priority": "CRITICAL", "status": "In Progress" },
    { "id": "#TK-8491", "title": "Asset Logo Redistribution", "time": "15 mins ago", "author": "Mark R.", "source": "MKT", "target": "DES", "priority": "MEDIUM", "status": "Queued" },
    { "id": "#TK-8488", "title": "Patient Record DB Sync", "time": "42 mins ago", "author": "Dr. Aris", "source": "MED", "target": "DEV", "priority": "HIGH", "status": "Researching" }
  ]
}
const TicketingDashboard = () => {
  
  const columns = [
    {
      title: 'TICKET ID',
      dataIndex: 'id',
      render: (text: string) => <span className="font-bold text-blue-900">{text}</span>,
    },
    {
      title: 'TITLE',
      dataIndex: 'title',
      render: (text: string, record: any) => (
        <div>
          <div className="font-bold text-slate-800">{text}</div>
          <div className="text-xs text-slate-400">{record.time} by {record.author}</div>
        </div>
      ),
    },
    {
      title: 'SOURCE / TARGET',
      render: (record: any) => (
        <div className="flex items-center gap-2">
          <Tag className="bg-blue-50 text-blue-600 border-none font-bold">{record.source}</Tag>
          <span className="text-slate-300">→</span>
          <Tag className="bg-indigo-50 text-indigo-600 border-none font-bold">{record.target}</Tag>
        </div>
      ),
    },
    {
      title: 'PRIORITY',
      dataIndex: 'priority',
      render: (priority: string) => {
        const colors: any = { CRITICAL: 'error', HIGH: 'warning', MEDIUM: 'blue' };
        return <Tag color={colors[priority]} className="font-bold px-3">{priority}</Tag>;
      },
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      render: (status: string) => (
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-slate-400"></span>
          <span className="text-slate-600 text-sm">{status}</span>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {data.stats.map((stat: any, i: number) => (
          <Card key={i} className="rounded-2xl border-none shadow-sm overflow-hidden">
            <div className="flex justify-between items-start">
              <div className="p-3 bg-slate-100 rounded-xl text-indigo-900 text-xl">
                {/* {i === 0 && <AiOutlineTicket />} */}
                {i === 1 && <AiOutlineFolderOpen />}
                {i === 2 && <AiOutlineCheckCircle />}
                {i === 3 && <AiOutlineClockCircle />}
              </div>
              {stat.trend && <span className="text-emerald-500 text-xs font-bold">{stat.trend} vs last week</span>}
            </div>
            <div className="mt-4">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
              <h2 className="text-3xl font-black text-slate-800">{stat.value}</h2>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Priority Breakdown & Trends */}
        <Card title="Ticket Priority" className="rounded-2xl border-none shadow-sm">
           <div className="space-y-4 mb-6">
              {[
                { label: 'Critical', val: 12, color: 'bg-red-500' },
                { label: 'High', val: 28, color: 'bg-orange-400' },
                { label: 'Medium', val: 64, color: 'bg-indigo-900' },
                { label: 'Low', val: 120, color: 'bg-emerald-600' }
              ].map(p => (
                <div className="flex justify-between items-center text-sm font-bold" key={p.val}>
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${p.color}`}></span>
                    <span className="text-slate-500">{p.label}</span>
                  </div>
                  <span className="text-slate-800">{p.val}</span>
                </div>
              ))}
           </div>
           {/* Simple CSS Bar chart mock */}
           <div className="flex items-end gap-2 h-24 pt-4">
              <div className="w-full bg-red-500 h-[20%] rounded-t"></div>
              <div className="w-full bg-orange-400 h-[40%] rounded-t"></div>
              <div className="w-full bg-indigo-900 h-[80%] rounded-t"></div>
              <div className="w-full bg-emerald-600 h-[100%] rounded-t"></div>
              <div className="w-full bg-slate-200 h-[30%] rounded-t"></div>
           </div>
        </Card>

        <Card title="Volume Trends" className="lg:col-span-2 rounded-2xl border-none shadow-sm">
           <div className="h-48 w-full bg-slate-50 rounded-xl flex items-center justify-center relative overflow-hidden">
             {/* Simple SVG Wave to match UI */}
              <svg viewBox="0 0 500 100" className="w-full h-full stroke-indigo-900 fill-none stroke-2">
                <path d="M0,80 C100,80 150,20 250,50 C350,80 400,10 500,40" strokeLinejoin="round" />
              </svg>
              <div className="absolute bottom-2 left-0 right-0 flex justify-between px-4 text-[10px] font-bold text-slate-300">
                <span>JAN</span><span>FEB</span><span>MAR</span><span>APR</span><span>MAY</span><span>JUN</span>
              </div>
           </div>
        </Card>
      </div>

      {/* Active Ticket Monitor Table */}
      <div className="mt-8 bg-white rounded-2xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-slate-800">Active Ticket Monitor</h3>
          <div className="flex gap-2">
            <Button icon={<AiOutlineFilter />}>Filters</Button>
            <Button type="primary" className="bg-indigo-900">Export Report</Button>
          </div>
        </div>
        <Table 
          dataSource={data.activeTickets} 
          columns={columns} 
          pagination={false} 
          className="border-t border-slate-50"
        />
        <Button type="text" className="w-full mt-4 text-slate-400 font-bold uppercase text-xs">
          Load 50 More Entries
        </Button>
      </div>

      {/* Bottom Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="space-y-4">
          <h3 className="font-bold text-slate-800">Recent System Activity</h3>
          <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-emerald-500">
            <div className="flex gap-3 text-sm">
              <AiOutlineUserAdd className="text-emerald-500 mt-1" />
              <div>
                <p className="font-bold m-0">New User Created</p>
                <p className="text-slate-400 text-xs">Admin Alex S. added 'Julia Chen' to Marketing.</p>
                <p className="text-[10px] text-slate-300 mt-1">5 MINS AGO</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-indigo-900">
            <div className="flex gap-3 text-sm">
              <AiOutlineCheckCircle className="text-indigo-900 mt-1" />
              <div>
                <p className="font-bold m-0">IT Ticket Resolved</p>
                <p className="text-slate-400 text-xs">#TK-8400 marked as completed.</p>
                <p className="text-[10px] text-slate-300 mt-1">18 MINS AGO</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 relative h-64 rounded-2xl overflow-hidden group cursor-pointer">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000" 
            className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105" 
            alt="office" 
          />
          <div className="absolute inset-0 bg-indigo-900/80 p-8 flex flex-col justify-end">
             <h2 className="text-2xl font-bold text-white mb-2">Executive Architect Portal v4.2</h2>
             <p className="text-indigo-100 text-sm max-w-md">The next evolution in enterprise resource management. Precise data curation for top-tier decision making.</p>
             <div className="flex gap-3 mt-4">
               <Button className="bg-white/10 border-white/20 text-white hover:bg-white/20">Check Updates</Button>
               <Button className="bg-emerald-500 border-none text-white font-bold">Go Live</Button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketingDashboard;