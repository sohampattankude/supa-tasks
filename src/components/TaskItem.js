import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';

export default function TaskItem({ task, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.task_title);

  const handleToggleComplete = () => {
    onUpdate(task.id, { completed: !task.completed });
  };

  const handleSaveEdit = () => {
    if (editTitle.trim()) {
      onUpdate(task.id, { task_title: editTitle.trim() });
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditTitle(task.task_title);
    setIsEditing(false);
  };

  return (
    <View style={[styles.container, task.completed && styles.completedContainer]}>
      <TouchableOpacity
        style={styles.checkbox}
        onPress={handleToggleComplete}
      >
        <View style={[
          styles.checkboxCircle,
          task.completed && styles.checkboxChecked
        ]}>
          {task.completed && <Text style={styles.checkmark}>✓</Text>}
        </View>
      </TouchableOpacity>

      <View style={styles.content}>
        {isEditing ? (
          <TextInput
            style={styles.editInput}
            value={editTitle}
            onChangeText={setEditTitle}
            onSubmitEditing={handleSaveEdit}
            autoFocus
          />
        ) : (
          <Text style={[
            styles.taskTitle,
            task.completed && styles.completedText
          ]}>
            {task.task_title}
          </Text>
        )}
      </View>

      <View style={styles.actions}>
        {isEditing ? (
          <>
            <TouchableOpacity onPress={handleSaveEdit} style={styles.actionButton}>
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCancelEdit} style={styles.actionButton}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              onPress={() => setIsEditing(true)}
              style={styles.actionButton}
            >
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onDelete(task.id)}
              style={styles.actionButton}
            >
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  completedContainer: {
    opacity: 0.6,
  },
  checkbox: {
    marginRight: 12,
  },
  checkboxCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  checkmark: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    marginRight: 12,
  },
  taskTitle: {
    fontSize: 16,
    color: '#333',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#666',
  },
  editInput: {
    fontSize: 16,
    color: '#333',
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  actions: {
    flexDirection: 'row',
  },
  actionButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginLeft: 8,
  },
  editText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
  },
  deleteText: {
    color: '#ff3b30',
    fontSize: 14,
    fontWeight: '500',
  },
  saveText: {
    color: '#34c759',
    fontSize: 14,
    fontWeight: '500',
  },
  cancelText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
});
