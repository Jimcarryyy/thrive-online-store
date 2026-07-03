import { Link } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFound = () => (
  <div className="min-h-[60vh] flex items-center justify-center px-4">
    <div className="text-center max-w-md">
      <p className="text-6xl font-bold text-primary mb-4">404</p>
      <h1 className="text-xl font-semibold mb-2">Page not found</h1>
      <p className="text-muted-foreground mb-8">
        That page does not exist. Try the shop or browse categories.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Button asChild>
          <Link to="/products"><Search className="w-4 h-4 mr-2" />Shop</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/"><ArrowLeft className="w-4 h-4 mr-2" />Home</Link>
        </Button>
      </div>
    </div>
  </div>
);

export default NotFound;
