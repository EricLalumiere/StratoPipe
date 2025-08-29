# Python
STATUS_CHOICES = [
    ('placeholder', 'placeholder'),
    ('ready_to_start', 'ready to start'),
    ('work_in_progress', 'work in progress'),
    ('kickback', 'kickback'),
    ('ready_for_review', 'ready for review'),
    ('approved', 'approved'),
    ('published', 'published'),
]
STATUS_VALUES = [key for key, _ in STATUS_CHOICES]