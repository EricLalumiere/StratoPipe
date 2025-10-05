import os
import requests
from django.core.management.base import BaseCommand
from django.core.files.base import ContentFile
from django.contrib.auth import get_user_model
from projects.models import Project
from assets.models import Asset

User = get_user_model()

class Command(BaseCommand):
    help = 'Retrieve and store all UXCanvas images from the project'

    def add_arguments(self, parser):
        parser.add_argument(
            '--project-id',
            type=str,
            default='cyber-nexus',
            help='Project ID to associate images with'
        )
        parser.add_argument(
            '--user-id',
            type=int,
            default=1,
            help='User ID to associate images with'
        )

    def handle(self, *args, **options):
        project_id = options['project_id']
        user_id = options['user_id']
        
        # Get or create project and user
        try:
            project = Project.objects.get(name=project_id)
        except Project.DoesNotExist:
            project = Project.objects.create(
                name=project_id,
                description=f"Project for {project_id}",
                owner_id=user_id
            )
            self.stdout.write(f"Created project: {project.name}")
        
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            self.stdout.write(self.style.ERROR(f"User with ID {user_id} does not exist"))
            return

        # List of all image IDs found in the codebase
        image_ids = [
            "0512db2b-5daa-41bb-90a0-8e27b8bffda4",
            "06f886da-acfd-49c5-9760-a2b6a4ca6ba2",
            "0814ddea-9e48-4cf7-8a42-f5492e25e29e",
            "10d7be19-25e9-4016-bc21-49e68c58235f",
            "17cb73a0-39ab-44c4-8e9b-b65251334a1c",
            "1886799b-8f1b-4f02-a1d5-b440f5b423fd",
            "29ad8926-c761-4955-a819-a0623dfe5a5f",
            "2dd9723a-dbe0-4dc2-b6ec-84fc1f997217",
            "3101fea8-ddec-455e-b08f-60475173808c",
            "39fc2bcc-f68b-4af6-bab7-0f3b12821587",
            "3fcbec4c-ad53-46cc-af64-70b407a807ef",
            "49440c97-cbcd-45cd-acf2-11a20883b0bf",
            "4c9119c6-1ee5-456c-b3c8-e432554d08c2",
            "4d9249a6-f789-4e57-ac62-0c1e4e93cd21",
            "5e96ff52-009e-46da-8be8-d6f4173ee351",
            "66918ab4-4141-4dbe-ad2a-5d5bbb3d5d4c",
            "6c2cc018-592b-45f6-9fa0-8c76a58218d0",
            "77ab4ba2-0910-4565-b16d-f5a31131e46c",
            "7d9420b6-06ca-444f-b92f-d384af497569",
            "81637319-b931-485b-ae5c-180e1de4e865",
            "84d03d96-161a-45af-8fa7-fbbf61cbce83",
            "8efa7049-fbc0-4bb8-86a7-be949557395c",
            "947f5f83-17ea-4727-8bcc-8e40fb166ef6",
            "9cc0411d-5654-4328-b402-47e45b008826",
            "a0172859-2b18-486c-bb68-413b09816d98",
            "acb76dcd-8e07-46af-bd09-ff8646e148d1",
            "b4a093f2-6333-48c3-8174-2abf1b905d7f",
            "b7e6f3ab-1a4b-4554-9b56-4f31a4ec28bc",
            "b9405540-c37f-4f64-9e28-7f6076a0ef62",
            "bc0e4a4a-101f-4d8a-8238-dbedd4fd1662",
            "c0edf762-08ec-45d7-bb29-62663a067000",
            "cc5e58cc-e0b6-4fbb-8211-c37a3f742558",
            "ceefd621-be9f-4105-b053-e14f9e49e546",
            "cf7f8f23-cdce-4d24-97fc-8979015c691f",
            "e3ea5a11-f0f9-4541-839e-054ca2a5e97d",
            "e790c7be-94f3-4fcb-a7d9-a800893c8f9c",
            "f5269a71-cf2f-46ca-916b-1655f95f2d85"
        ]

        # Image metadata mapping based on usage patterns
        image_metadata = {
            "0512db2b-5daa-41bb-90a0-8e27b8bffda4": {"name": "Hover Vehicle", "type": "Vehicle", "category": "Transportation"},
            "06f886da-acfd-49c5-9760-a2b6a4ca6ba2": {"name": "Neon City Environment", "type": "Environment", "category": "Urban"},
            "0814ddea-9e48-4cf7-8a42-f5492e25e29e": {"name": "Animated Prop", "type": "Prop", "category": "Interactive"},
            "10d7be19-25e9-4016-bc21-49e68c58235f": {"name": "Ocean Floor Environment", "type": "Environment", "category": "Underwater"},
            "17cb73a0-39ab-44c4-8e9b-b65251334a1c": {"name": "Space Station Interior", "type": "Environment", "category": "Space"},
            "1886799b-8f1b-4f02-a1d5-b440f5b423fd": {"name": "Cyberpunk City Scene", "type": "Scene", "category": "Establishing Shot"},
            "29ad8926-c761-4955-a819-a0623dfe5a5f": {"name": "Generic Prop", "type": "Prop", "category": "General"},
            "2dd9723a-dbe0-4dc2-b6ec-84fc1f997217": {"name": "Storyboard Frame", "type": "Storyboard", "category": "Previsualization"},
            "3101fea8-ddec-455e-b08f-60475173808c": {"name": "Space Odyssey Background", "type": "Environment", "category": "Space"},
            "39fc2bcc-f68b-4af6-bab7-0f3b12821587": {"name": "Deep Space Environment", "type": "Environment", "category": "Space"},
            "3fcbec4c-ad53-46cc-af64-70b407a807ef": {"name": "Animated Character", "type": "Character", "category": "Animated"},
            "49440c97-cbcd-45cd-acf2-11a20883b0bf": {"name": "Ocean Depths Background", "type": "Environment", "category": "Underwater"},
            "4c9119c6-1ee5-456c-b3c8-e432554d08c2": {"name": "Cyber Nexus Background", "type": "Environment", "category": "Cyberpunk"},
            "4d9249a6-f789-4e57-ac62-0c1e4e93cd21": {"name": "Advanced Prop", "type": "Prop", "category": "Technology"},
            "5e96ff52-009e-46da-8be8-d6f4173ee351": {"name": "Animated Environment", "type": "Environment", "category": "Animated"},
            "66918ab4-4141-4dbe-ad2a-5d5bbb3d5d4c": {"name": "Animated Weapon", "type": "Prop", "category": "Weapon"},
            "6c2cc018-592b-45f6-9fa0-8c76a58218d0": {"name": "Futuristic Prop", "type": "Prop", "category": "Technology"},
            "77ab4ba2-0910-4565-b16d-f5a31131e46c": {"name": "Character Portrait", "type": "Character", "category": "Portrait"},
            "7d9420b6-06ca-444f-b92f-d384af497569": {"name": "Animated Vehicle", "type": "Vehicle", "category": "Animated"},
            "81637319-b931-485b-ae5c-180e1de4e865": {"name": "Cyber Character", "type": "Character", "category": "Cyberpunk"},
            "84d03d96-161a-45af-8fa7-fbbf61cbce83": {"name": "Space Character", "type": "Character", "category": "Space"},
            "8efa7049-fbc0-4bb8-86a7-be949557395c": {"name": "Ocean Character", "type": "Character", "category": "Underwater"},
            "947f5f83-17ea-4727-8bcc-8e40fb166ef6": {"name": "Generic Character", "type": "Character", "category": "General"},
            "9cc0411d-5654-4328-b402-47e45b008826": {"name": "Advanced Character", "type": "Character", "category": "Technology"},
            "a0172859-2b18-486c-bb68-413b09816d98": {"name": "Generic Environment", "type": "Environment", "category": "General"},
            "acb76dcd-8e07-46af-bd09-ff8646e148d1": {"name": "Specialized Prop", "type": "Prop", "category": "Specialized"},
            "b4a093f2-6333-48c3-8174-2abf1b905d7f": {"name": "Laser Weapon", "type": "Prop", "category": "Weapon"},
            "b7e6f3ab-1a4b-4554-9b56-4f31a4ec28bc": {"name": "Animated Environment", "type": "Environment", "category": "Animated"},
            "b9405540-c37f-4f64-9e28-7f6076a0ef62": {"name": "Specialized Character", "type": "Character", "category": "Specialized"},
            "bc0e4a4a-101f-4d8a-8238-dbedd4fd1662": {"name": "Advanced Vehicle", "type": "Vehicle", "category": "Technology"},
            "c0edf762-08ec-45d7-bb29-62663a067000": {"name": "Futuristic Vehicle", "type": "Vehicle", "category": "Technology"},
            "cc5e58cc-e0b6-4fbb-8211-c37a3f742558": {"name": "Cyber Suit Character", "type": "Character", "category": "Cyberpunk"},
            "ceefd621-be9f-4105-b053-e14f9e49e546": {"name": "Unique Prop", "type": "Prop", "category": "Unique"},
            "cf7f8f23-cdce-4d24-97fc-8979015c691f": {"name": "Animated Character", "type": "Character", "category": "Animated"},
            "e3ea5a11-f0f9-4541-839e-054ca2a5e97d": {"name": "Energy Shield", "type": "Prop", "category": "Defense"},
            "e790c7be-94f3-4fcb-a7d9-a800893c8f9c": {"name": "Space Prop", "type": "Prop", "category": "Space"},
            "f5269a71-cf2f-46ca-916b-1655f95f2d85": {"name": "Advanced Prop", "type": "Prop", "category": "Technology"}
        }

        base_url = "https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255"
        
        success_count = 0
        error_count = 0
        
        for image_id in image_ids:
            try:
                # Check if asset already exists
                existing_asset = Asset.objects.filter(
                    name=image_metadata[image_id]["name"],
                    project=project
                ).first()
                
                if existing_asset:
                    self.stdout.write(f"Skipping existing asset: {image_metadata[image_id]['name']}")
                    continue
                
                # Download image
                image_url = f"{base_url}/{image_id}"
                response = requests.get(image_url, timeout=30)
                response.raise_for_status()
                
                # Create asset
                asset = Asset.objects.create(
                    name=image_metadata[image_id]["name"],
                    description=f"UXCanvas generated image: {image_metadata[image_id]['name']}",
                    asset_type='image',
                    status='completed',
                    owner=user,
                    project=project,
                    categories=image_metadata[image_id]["category"],
                    ai_enhanced=True
                )
                
                # Save the image file
                image_content = ContentFile(response.content)
                asset.file.save(
                    f"{image_id}.jpg",
                    image_content,
                    save=True
                )
                
                # Create thumbnail (same as main image for now)
                asset.thumbnail.save(
                    f"{image_id}_thumb.jpg",
                    image_content,
                    save=True
                )
                
                asset.is_rendered = True
                asset.save()
                
                success_count += 1
                self.stdout.write(
                    self.style.SUCCESS(f"Successfully created asset: {asset.name}")
                )
                
            except requests.RequestException as e:
                error_count += 1
                self.stdout.write(
                    self.style.ERROR(f"Failed to download {image_id}: {str(e)}")
                )
            except Exception as e:
                error_count += 1
                self.stdout.write(
                    self.style.ERROR(f"Failed to create asset for {image_id}: {str(e)}")
                )
        
        self.stdout.write(
            self.style.SUCCESS(
                f"\nCompleted! Successfully processed {success_count} images, "
                f"{error_count} errors occurred."
            )
        )
