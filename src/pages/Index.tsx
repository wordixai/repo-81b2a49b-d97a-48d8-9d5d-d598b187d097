import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Copy, Download, Code, Palette, Database, Settings } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';

interface AppConfig {
  name: string;
  description: string;
  framework: string;
  styling: string;
  database: string;
  features: string[];
  pages: string[];
}

const Index = () => {
  const [appConfig, setAppConfig] = useState<AppConfig>({
    name: '',
    description: '',
    framework: 'react',
    styling: 'tailwind',
    database: 'none',
    features: [],
    pages: ['Home']
  });

  const [generatedCode, setGeneratedCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const frameworks = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' }
  ];

  const stylingOptions = [
    { value: 'tailwind', label: 'Tailwind CSS' },
    { value: 'bootstrap', label: 'Bootstrap' },
    { value: 'material', label: 'Material UI' },
    { value: 'chakra', label: 'Chakra UI' }
  ];

  const databaseOptions = [
    { value: 'none', label: 'No Database' },
    { value: 'firebase', label: 'Firebase' },
    { value: 'supabase', label: 'Supabase' },
    { value: 'mongodb', label: 'MongoDB' }
  ];

  const availableFeatures = [
    'Authentication',
    'User Management',
    'Dashboard',
    'CRUD Operations',
    'File Upload',
    'Search',
    'Notifications',
    'Analytics'
  ];

  const handleFeatureToggle = (feature: string) => {
    setAppConfig(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const addPage = () => {
    const pageName = prompt('Enter page name:');
    if (pageName && !appConfig.pages.includes(pageName)) {
      setAppConfig(prev => ({
        ...prev,
        pages: [...prev.pages, pageName]
      }));
    }
  };

  const removePage = (page: string) => {
    if (page !== 'Home') {
      setAppConfig(prev => ({
        ...prev,
        pages: prev.pages.filter(p => p !== page)
      }));
    }
  };

  const generateCode = async () => {
    setIsGenerating(true);
    
    // Simulate code generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const code = generateAppCode(appConfig);
    setGeneratedCode(code);
    setIsGenerating(false);
    
    toast({
      title: "Code Generated!",
      description: "Your app structure has been generated successfully.",
    });
  };

  const generateAppCode = (config: AppConfig) => {
    return `// ${config.name} - Generated App Structure
// Framework: ${config.framework}
// Styling: ${config.styling}
// Database: ${config.database}

// Package.json
{
  "name": "${config.name.toLowerCase().replace(/\s+/g, '-')}",
  "description": "${config.description}",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    ${config.framework === 'react' ? '"react": "^18.2.0",\n    "react-dom": "^18.2.0",' : ''}
    ${config.styling === 'tailwind' ? '"tailwindcss": "^3.3.0",' : ''}
    ${config.database === 'firebase' ? '"firebase": "^10.0.0",' : ''}
    ${config.database === 'supabase' ? '"@supabase/supabase-js": "^2.38.0",' : ''}
    "vite": "^4.4.0"
  }
}

// App.${config.framework === 'react' ? 'jsx' : 'vue'}
${generateMainComponent(config)}

// Pages
${config.pages.map(page => generatePageComponent(page, config)).join('\n\n')}

// Features
${config.features.map(feature => generateFeatureComponent(feature, config)).join('\n\n')}`;
  };

  const generateMainComponent = (config: AppConfig) => {
    if (config.framework === 'react') {
      return `import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
${config.pages.map(page => `import ${page}Page from './pages/${page}Page';`).join('\n')}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-semibold">${config.name}</h1>
              </div>
            </div>
          </div>
        </nav>
        
        <main>
          <Routes>
            ${config.pages.map(page => `<Route path="${page === 'Home' ? '/' : `/${page.toLowerCase()}`}" element={<${page}Page />} />`).join('\n            ')}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;`;
    }
    return `// ${config.framework} component structure would go here`;
  };

  const generatePageComponent = (page: string, config: AppConfig) => {
    return `// ${page}Page.jsx
import React from 'react';

const ${page}Page = () => {
  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-3xl font-bold text-gray-900">${page}</h1>
        <p className="mt-4 text-gray-600">
          Welcome to the ${page} page of ${config.name}.
        </p>
      </div>
    </div>
  );
};

export default ${page}Page;`;
  };

  const generateFeatureComponent = (feature: string, config: AppConfig) => {
    return `// ${feature}Component.jsx
import React from 'react';

const ${feature}Component = () => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900">${feature}</h2>
      <p className="mt-2 text-gray-600">
        ${feature} functionality for ${config.name}.
      </p>
    </div>
  );
};

export default ${feature}Component;`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    toast({
      title: "Copied!",
      description: "Code has been copied to clipboard.",
    });
  };

  const downloadCode = () => {
    const blob = new Blob([generatedCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${appConfig.name || 'app'}-structure.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <Code className="inline-block mr-2 h-8 w-8" />
            App Builder Code Generator
          </h1>
          <p className="text-xl text-gray-600">
            Generate complete app structures with modern frameworks and tools
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Configuration Panel */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="mr-2 h-5 w-5" />
                App Configuration
              </CardTitle>
              <CardDescription>
                Configure your app settings and features
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="basic">Basic</TabsTrigger>
                  <TabsTrigger value="tech">Tech</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="pages">Pages</TabsTrigger>
                </TabsList>
                
                <TabsContent value="basic" className="space-y-4">
                  <div>
                    <Label htmlFor="appName">App Name</Label>
                    <Input
                      id="appName"
                      placeholder="My Awesome App"
                      value={appConfig.name}
                      onChange={(e) => setAppConfig(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="A brief description of your app..."
                      value={appConfig.description}
                      onChange={(e) => setAppConfig(prev => ({ ...prev, description: e.target.value }))}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="tech" className="space-y-4">
                  <div>
                    <Label>Framework</Label>
                    <Select value={appConfig.framework} onValueChange={(value) => setAppConfig(prev => ({ ...prev, framework: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {frameworks.map(fw => (
                          <SelectItem key={fw.value} value={fw.value}>{fw.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Styling</Label>
                    <Select value={appConfig.styling} onValueChange={(value) => setAppConfig(prev => ({ ...prev, styling: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {stylingOptions.map(style => (
                          <SelectItem key={style.value} value={style.value}>{style.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Database</Label>
                    <Select value={appConfig.database} onValueChange={(value) => setAppConfig(prev => ({ ...prev, database: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {databaseOptions.map(db => (
                          <SelectItem key={db.value} value={db.value}>{db.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>

                <TabsContent value="features" className="space-y-4">
                  <Label>Select Features</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {availableFeatures.map(feature => (
                      <Button
                        key={feature}
                        variant={appConfig.features.includes(feature) ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleFeatureToggle(feature)}
                        className="justify-start"
                      >
                        {feature}
                      </Button>
                    ))}
                  </div>
                  {appConfig.features.length > 0 && (
                    <div>
                      <Label>Selected Features</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {appConfig.features.map(feature => (
                          <Badge key={feature} variant="secondary">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="pages" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Pages</Label>
                    <Button onClick={addPage} size="sm">Add Page</Button>
                  </div>
                  <div className="space-y-2">
                    {appConfig.pages.map(page => (
                      <div key={page} className="flex items-center justify-between p-2 border rounded">
                        <span>{page}</span>
                        {page !== 'Home' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removePage(page)}
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>

              <Separator />
              
              <Button 
                onClick={generateCode} 
                className="w-full" 
                disabled={!appConfig.name || isGenerating}
              >
                {isGenerating ? 'Generating...' : 'Generate Code'}
              </Button>
            </CardContent>
          </Card>

          {/* Code Output Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <Code className="mr-2 h-5 w-5" />
                  Generated Code
                </span>
                {generatedCode && (
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={copyToClipboard}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={downloadCode}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </CardTitle>
              <CardDescription>
                Complete app structure and boilerplate code
              </CardDescription>
            </CardHeader>
            <CardContent>
              {generatedCode ? (
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-auto h-96 font-mono text-sm">
                  <pre>{generatedCode}</pre>
                </div>
              ) : (
                <div className="h-96 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <Code className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Configure your app and click "Generate Code" to see the output</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Index;