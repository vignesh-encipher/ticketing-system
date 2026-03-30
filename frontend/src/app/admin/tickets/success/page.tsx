"use client";

import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Result, Button, Card } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const ticketId = searchParams.get('ticketId');

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl border-none">
        <Result
          status="success"
          icon={<CheckCircleFilled className="text-[#006056] text-6xl" />}
          title={<h1 className="text-2xl font-black text-gray-900">Assignment Approved!</h1>}
          subTitle={
            <div className="text-gray-600 font-medium">
              Ticket <span className="text-[#143477] font-bold">#{ticketId}</span> has been successfully assigned and its status is now updated to <span className="font-bold">ASSIGNED</span>.
            </div>
          }
          extra={[
            <Button 
              key="dashboard"
              type="primary"
              size="large"
              className="bg-[#143477] hover:bg-[#0f265e] border-none font-bold rounded-lg h-12 px-8"
              onClick={() => router.push('/admin/tickets')}
            >
              Back to Repository
            </Button>
          ]}
        />
      </Card>
    </div>
  );
};

export default SuccessPage;
