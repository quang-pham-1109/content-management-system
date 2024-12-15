import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AdminForm from './form';

const AdminCard = () => {
  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Admin Login</CardTitle>
      </CardHeader>
      <CardContent>
        <AdminForm />
      </CardContent>
    </Card>
  );
};

export default AdminCard;
