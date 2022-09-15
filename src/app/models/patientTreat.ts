export class PatientTreat {
    public patientSpecId: number;  
    public patientId: number;
    public specId: number;
    public Name: string;
    
  
    constructor(
      patientSpecId: number,
      patientId: number,
      specId: number,
      Name: string,        
      
    ) {
      this.patientSpecId = patientSpecId;
      this.patientId=patientId;
      this.Name = Name;
      this.specId = specId;
      
    }
  
  
    
  }
  