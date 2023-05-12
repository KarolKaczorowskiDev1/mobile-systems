import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Subject } from 'rxjs';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

@Component({
  selector: 'app-user-webcam',
  templateUrl: './user-webcam.component.html',
  styleUrls: ['./user-webcam.component.scss']
})
export class UserWebcamComponent implements OnInit {
  capturedImage: WebcamImage | null = null;
  
  multipleCamsAvailable = false;

  private triggerCapture = new Subject<void>();
  triggerCapture$ = this.triggerCapture.asObservable();

  private triggerCameraSwitch = new Subject<boolean>();
  triggerCameraSwitch$ = this.triggerCameraSwitch.asObservable();

  readonly videoOptions: MediaTrackConstraints = {
    facingMode: { ideal: 'user', },
  };

  constructor(private snackBarService: SnackBarService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs()
    .then((mediaDevices: MediaDeviceInfo[]) => {
      this.multipleCamsAvailable = mediaDevices && mediaDevices.length > 1;
      this.cdr.detectChanges();
    });

  }

  discardCapturedImage(): void {
    this.capturedImage = null;
  }

  captureImage(): void {
    this.triggerCapture.next();
  }

  switchCamera(): void {
    this.triggerCameraSwitch.next(true);
  }

  onImageCapture(image: WebcamImage): void {
    this.capturedImage = image;
  }

  onError(error: WebcamInitError): void {
    this.snackBarService.show(error.message, 'Got it!');
  }
}
