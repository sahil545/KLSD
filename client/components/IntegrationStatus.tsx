import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, Zap } from 'lucide-react';

interface IntegrationStatusProps {
  currentStage: 'development' | 'staging' | 'production';
}

export function IntegrationStatus({ currentStage = 'development' }: IntegrationStatusProps) {
  const stages = [
    {
      id: 'development',
      title: 'Development',
      description: 'Building with mock data',
      status: 'completed',
      icon: '🛠️'
    },
    {
      id: 'staging',
      title: 'Staging Test',
      description: 'Deploy to staging domain',
      status: currentStage === 'development' ? 'pending' : 'completed',
      icon: '🧪'
    },
    {
      id: 'production',
      title: 'Production',
      description: 'Live WooCommerce integration',
      status: currentStage === 'production' ? 'completed' : 'pending',
      icon: '🚀'
    }
  ];

  return (
    <Card className="p-6 bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Zap className="w-5 h-5 text-blue-600" />
        Integration Progress
      </h3>
      
      <div className="space-y-4">
        {stages.map((stage, index) => (
          <div key={stage.id} className="flex items-center gap-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              stage.status === 'completed' 
                ? 'bg-green-100 text-green-600' 
                : stage.status === 'active'
                ? 'bg-blue-100 text-blue-600'
                : 'bg-gray-100 text-gray-400'
            }`}>
              {stage.status === 'completed' ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <Clock className="w-4 h-4" />
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-lg">{stage.icon}</span>
                <span className="font-medium text-gray-900">{stage.title}</span>
                <Badge variant={stage.status === 'completed' ? 'default' : 'secondary'}>
                  {stage.status === 'completed' ? 'Complete' : 'Pending'}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">{stage.description}</p>
            </div>
            
            {index < stages.length - 1 && (
              <div className="w-px h-8 bg-gray-200 absolute ml-4 mt-8"></div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-white rounded-lg border">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">📍</span>
          <span className="font-semibold text-gray-900">Current Status</span>
        </div>
        <p className="text-sm text-gray-600">
          ✅ <strong>API Integration:</strong> Ready for production<br/>
          ✅ <strong>Mock Data:</strong> Simulating your real products<br/>
          ✅ <strong>Booking Forms:</strong> Fully functional<br/>
          ✅ <strong>Responsive Design:</strong> Mobile optimized<br/>
          🕒 <strong>Next Step:</strong> Deploy to your domain for live WooCommerce connection
        </p>
      </div>
    </Card>
  );
}
