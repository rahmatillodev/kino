import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,  } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export function DeleteModal({ isOpen, onOpenChange, onDelete, filmName }) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px] bg-white p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-red-600">Delete Film</DialogTitle>
        </DialogHeader>
        <div className="text-gray-700">
          Are you sure you want to delete the film <strong>{filmName}</strong>? This action cannot be undone.
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="mr-2">Cancel</Button>
          <Button onClick={onDelete} className="bg-red-500 text-white">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
